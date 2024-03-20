<template>
    <q-page class="row justify-center">
        <div class="flex items-center"
            style="min-width: 100%; max-height: 100px;">
            <TheFilters />
        </div>
        <div>
            <TrainingGroundCard v-for="tg in trainingGrounds" :key="tg.id"
                :tg="tg" @add-to-favorites="addToFavorites"
                @remove-from-favorites="removeFromFavorites" />
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useGeolocationStore } from "src/stores/geolocation";
import { useAuthStore } from "src/stores/auth";
import { useTrainingGroundsStore } from "src/stores/tg";
import TrainingGroundCard from "src/components/tg/TrainingGroundCard.vue";
import TheFilters from "src/components/tg/TheFilters.vue";

const geolocationStore = useGeolocationStore();
const authStore = useAuthStore();
const tgStore = useTrainingGroundsStore()

export default defineComponent({
    name: "IndexPage",
    components: { TrainingGroundCard, TheFilters },
    setup() {
        tgStore.getTraingGrounds()
        geolocationStore.getLocation();
    },
    data() {
        return {
            currentPage: tgStore.pagination.pageNumber,
            showClosest: false,
        };
    },
    methods: {
        async addToFavorites(tgId) {
            await tgStore.addToFavorites(tgId);
            await tgStore.getTraingGrounds();
        },
        async removeFromFavorites(tgId) {
            await tgStore.removeFromFavorites(tgId);
            await tgStore.getTraingGrounds();
        },
    },
    computed: {
        trainingGrounds() {
            return tgStore.trainingGrounds
        },
        location() {
            return geolocationStore.location;
        },
        pageNumber() {
            return tgStore.pagination.pageNumber;
        },
        pageSize() {
            return tgStore.pagination.pageSize;
        },
        totalPages() {
            return tgStore.totalPages;
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

        isAdmin() {
            return authStore.isStaff;
        },
    },
    watch: {
        currentPage(newValue) {
            tgStore.pagination.pageNumber = newValue;
            tgStore.getTraingGrounds()
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
                tgStore.filters.referencePoint = refPoint;
                tgStore.pagination.pageNumber = 1;
                this.currentPage = 1;
                tgStore.getTraingGrounds()
            } else {
                tgStore.filters.referencePoint = null;
                tgStore.pagination.pageNumber = 1;
                this.currentPage = 1;
                tgStore.trainingGrounds()
            }
        },
    },
});
</script>
