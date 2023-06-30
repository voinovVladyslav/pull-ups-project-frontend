<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md">
            <q-table
                flat
                bordered
                title="Pull Up Bars"
                :rows="bars"
                :columns="pullUpBarsColumns"
                :pagination="pagination"
                :rows-per-page-options="[]"
            >
                <template v-slot:body-cell-distance="props">
                    <q-td>
                        <div v-if="location">
                            {{
                                roundToTwoDigits(
                                    distanceToBar(
                                        location,
                                        props.row.location.coordinates
                                    )
                                )
                            }}
                            km
                        </div>
                        <div v-else>Calculating...</div>
                    </q-td>
                </template>
                <template v-slot:pagination>
                    <q-pagination
                        v-model="currentPage"
                        boundary-links
                        direction-links
                        :max="totalPages"
                        :max-pages="6"
                    />
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useBarsStore } from "src/stores/bars";
import { useGeolocationStore } from "src/stores/geolocation";

const barsStore = useBarsStore();
const geolocationStore = useGeolocationStore();

export default defineComponent({
    name: "IndexPage",
    data() {
        return {
            currentPage: barsStore.pageNumber,
            pullUpBarsColumns: [
                { name: "id", label: "Pull Up Bar ID", field: "id" },
                { name: "name", label: "Name", field: "title" },
                {
                    name: "distance",
                    label: "Distance from your location",
                    field: "location",
                },
            ],
        };
    },
    setup() {
        barsStore.getBars();
        geolocationStore.getLocation();
    },
    computed: {
        bars() {
            return barsStore.bars;
        },
        location() {
            return geolocationStore.location;
        },
        pageNumber() {
            return barsStore.pageNumber;
        },
        pageSize() {
            return barsStore.pageSize;
        },
        totalPages() {
            return barsStore.totalPages;
        },
        pagination() {
            return {
                page: this.pageNumber,
                rowsPerPage: this.pageSize,
            };
        },
    },
    watch: {
        currentPage(newValue) {
            barsStore.pageNumber = newValue;
            barsStore.getBars();
        },
    },
    methods: {
        updatePagination(newPagination) {
            barsStore.pageSize = newPagination.rowsPerPage;
            barsStore.pageNumber = 1;
            this.currentPage = 1;
            barsStore.getBars();
        },
        distanceToBar(currentLocation, barCoords) {
            const lat1 = currentLocation.latitude;
            const lon1 = currentLocation.longitude;
            const lat2 = barCoords[0];
            const lon2 = barCoords[1];

            if (lat1 == lat2 && lon1 == lon2) {
                return 0;
            } else {
                let radlat1 = (Math.PI * lat1) / 180;
                let radlat2 = (Math.PI * lat2) / 180;
                let theta = lon1 - lon2;
                let radtheta = (Math.PI * theta) / 180;
                let dist =
                    Math.sin(radlat1) * Math.sin(radlat2) +
                    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = (dist * 180) / Math.PI;
                dist = dist * 60 * 1.1515;
                dist = dist * 1.609344;
                return dist;
            }
        },
        roundToTwoDigits(number) {
            return Math.round((number + Number.EPSILON) * 100) / 100;
        },
    },
});
</script>
