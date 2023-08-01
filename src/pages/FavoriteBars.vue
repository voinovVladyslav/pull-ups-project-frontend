<template>
    <q-page>
        <div class="q-pa-md row">
            <div class="col-12 q-mt-md">
                <q-list>
                    <q-item
                        v-for="bar in bars"
                        :key="bar.id"
                        class="row justify-center"
                    >
                        <q-item-section class="col-3 text-center">
                            {{ bar.id }}
                        </q-item-section>
                        <q-item-section class="col-3 text-center">
                            {{ bar.title }}
                        </q-item-section>
                        <q-item-section class="col-3 text-center">
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
                        <q-item-section class="col-3">
                            <q-icon
                                name="more_vert"
                                clickable
                                size="sm"
                                style="margin-left: auto; margin-right: auto"
                            >
                                <q-menu auto-close fit style="min-width: 150px">
                                    <q-list>
                                        <q-item
                                            clickable
                                            v-close-popup
                                            :disable="!isAuthenticated"
                                        >
                                            <q-item-section>
                                                Start Workout
                                            </q-item-section>
                                        </q-item>
                                        <q-item
                                            clickable
                                            v-close-popup
                                            @click="removeFromFavorite(bar.id)"
                                            :disable="!isAuthenticated"
                                        >
                                            <q-item-section>
                                                Add to Favorite
                                            </q-item-section>
                                        </q-item>
                                        <q-item clickable v-close-popup>
                                            <q-item-section
                                                v-if="location"
                                                color="black"
                                            >
                                                <a
                                                    style="
                                                        text-decoration: none;
                                                        color: black;
                                                    "
                                                    target="_blank"
                                                    :href="
                                                        createLinkToGoogleMaps(
                                                            bar.location
                                                                .coordinates,
                                                            location
                                                        )
                                                    "
                                                >
                                                    View on Map
                                                </a>
                                            </q-item-section>
                                            <q-item-section v-else>
                                                Calculating...
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-icon>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useBarsStore } from "src/stores/bars";
import { useGeolocationStore } from "src/stores/geolocation";
import { useAuthStore } from "src/stores/auth";
import {
    roundToTwoDigits,
    createLinkToGoogleMaps,
    distanceToBar,
} from "src/utils/bars";

const barsStore = useBarsStore();
const geolocationStore = useGeolocationStore();
const authStore = useAuthStore();

export default defineComponent({
    name: "FavoriteBars",
    data() {
        return {
            showClosest: false,
        };
    },
    setup() {
        barsStore.getFavoriteBars();
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
                barsStore.getFavoriteBars();
            } else {
                barsStore.referencePoint = null;
                barsStore.pageNumber = 1;
                this.currentPage = 1;
                barsStore.getFavoriteBars();
            }
        },
    },
    methods: {
        async removeFromFavorite(id) {
            await barsStore.removeFromFavorite(id);
            this.currentPage = 1;
            barsStore.pageNumber = 1;
            await barsStore.getFavoriteBars();
        },
        distanceToBar(currentLocation, barCoords) {
            return distanceToBar(currentLocation, barCoords);
        },
        roundToTwoDigits(number) {
            return roundToTwoDigits(number);
        },
        createLinkToGoogleMaps(destinationPoint, location) {
            return createLinkToGoogleMaps(destinationPoint, location);
        },
    },
});
</script>
