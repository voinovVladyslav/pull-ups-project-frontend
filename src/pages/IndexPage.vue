<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md row">
            <div class="col-12 row justify-center">
                <q-btn-group spread class="col-10">
                    <q-btn
                        label="Closest first"
                        @click="showClosest = true"
                        :color="showClosest ? 'primary' : 'white'"
                        :text-color="showClosest ? 'white' : 'black'"
                    ></q-btn>
                    <q-btn
                        label="Newest first"
                        :disable="!location"
                        :color="!showClosest ? 'primary' : 'white'"
                        :text-color="!showClosest ? 'white' : 'black'"
                        @click="showClosest = false"
                    ></q-btn>
                </q-btn-group>
            </div>
            <div class="col-12">
                <q-list>
                    <q-item class="row justify-center">
                        <q-item-section class="col-1 text-center"
                            >ID</q-item-section
                        >
                        <q-item-section class="col-2 text-center"
                            >Distance</q-item-section
                        >
                        <q-item-section class="col-3 text-center"
                            >Start workout</q-item-section
                        >
                        <q-item-section class="col-3 text-center"
                            >Add to favorite</q-item-section
                        >
                        <q-item-section class="col-3 text-center"
                            >Show on map</q-item-section
                        >
                    </q-item>
                    <q-item
                        v-for="bar in bars"
                        :key="bar.id"
                        class="row justify-center"
                    >
                        <q-item-section class="col-1 text-center">{{
                            bar.id
                        }}</q-item-section>
                        <q-item-section class="col-2 text-center">
                            <div v-if="location">
                                {{
                                    roundToTwoDigits(
                                        distanceToBar(
                                            location,
                                            bar.location.coordinates
                                        )
                                    )
                                }}
                                km
                            </div>
                            <div v-else>Calculating...</div>
                        </q-item-section>
                        <q-item-section class="col-3 text-center"
                            ><q-btn
                                label="Start workout"
                                :disable="!isAuthenticated"
                            ></q-btn
                        ></q-item-section>
                        <q-item-section class="col-3 text-center">
                            <q-btn
                                label="Add to favorite"
                                @click="addToFavorite(bar.id)"
                                :disable="!isAuthenticated"
                            ></q-btn>
                        </q-item-section>
                        <q-item-section class="col-3 text-center">
                            <div v-if="location">
                                <a
                                    target="_blank"
                                    :href="
                                        createLinkToGoogleMaps(
                                            bar.location.coordinates
                                        )
                                    "
                                >
                                    <q-btn label="View on map"> </q-btn>
                                </a>
                            </div>
                            <div v-else>Calculating...</div>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div class="col-12">
                <q-pagination
                    v-model="currentPage"
                    boundary-links
                    direction-links
                    :max="totalPages"
                    :max-pages="6"
                />
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useBarsStore } from "src/stores/bars";
import { useGeolocationStore } from "src/stores/geolocation";
import { useAuthStore } from "src/stores/auth";

const barsStore = useBarsStore();
const geolocationStore = useGeolocationStore();
const authStore = useAuthStore();

export default defineComponent({
    name: "IndexPage",
    data() {
        return {
            currentPage: barsStore.pageNumber,
            showClosest: false,
            pullUpBarsColumns: [
                { name: "id", label: "Pull Up Bar ID", field: "id" },
                { name: "name", label: "Name", field: "title" },
                {
                    name: "distance",
                    label: "Distance from you",
                    field: "location",
                },
                {
                    name: "favorite",
                    label: "Favorite",
                    field: "favorite",
                },
                {
                    name: "route",
                    label: "Route on map",
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
        isAuthenticated() {
            return authStore.isAuthenticated;
        },
    },
    watch: {
        currentPage(newValue) {
            barsStore.pageNumber = newValue;
            barsStore.getBars();
        },
        showClosest(newValue) {
            if (!this.location) {
                this.showClosest = false;
                return;
            }
            if (newValue) {
                const refPoint = {
                    longitude: this.location.longitude,
                    latitude: this.location.latitude,
                };
                barsStore.referencePoint = refPoint;
                barsStore.pageNumber = 1;
                this.currentPage = 1;
                barsStore.getBars();
            } else {
                barsStore.referencePoint = null;
                barsStore.pageNumber = 1;
                this.currentPage = 1;
                barsStore.getBars();
            }
        },
    },
    methods: {
        async addToFavorite(id) {
            await barsStore.addToFavorite(id);
            this.currentPage = 1;
            barsStore.pageNumber = 1;
            await barsStore.getBars();
        },
        updatePagination(newPagination) {
            barsStore.pageSize = newPagination.rowsPerPage;
            barsStore.pageNumber = 1;
            this.currentPage = 1;
            barsStore.getBars();
        },
        distanceToBar(currentLocation, barCoords) {
            const lat1 = currentLocation.latitude;
            const lon1 = currentLocation.longitude;
            const lat2 = barCoords[1];
            const lon2 = barCoords[0];

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
        createLinkToGoogleMaps(destinationPoint) {
            if (!this.location) {
                return;
            }
            const toPoint = `${destinationPoint[1]},${destinationPoint[0]}`;
            const fromPoint = `${this.location.latitude},${this.location.longitude}`;
            const url = `https://www.google.com/maps/dir/${fromPoint}/${toPoint}`;
            return url;
        },
    },
});
</script>
