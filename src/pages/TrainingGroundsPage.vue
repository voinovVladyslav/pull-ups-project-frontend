<template>
    <q-page>
        <div class="row">
            <div class="col-12 row justify-center">
                <h5 class="q-mb-md q-mt-none">Discover</h5>
            </div>
            <div>
                <TrainingGroundCard v-for="tg in trainingGrounds" :key="tg.id"
                    :tg="tg" />
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useGeolocationStore } from "src/stores/geolocation";
import { useAuthStore } from "src/stores/auth";
import { useTrainingGroundsStore } from "src/stores/tg";
import TrainingGroundCard from "src/components/tg/TrainingGroundCard.vue";

const geolocationStore = useGeolocationStore();
const authStore = useAuthStore();
const tgStore = useTrainingGroundsStore()

export default defineComponent({
    name: "IndexPage",
    components: { TrainingGroundCard },
    data() {
        return {
            currentPage: tgStore.pagination.pageNumber,
            showClosest: false,
        };
    },
    setup() {
        tgStore.getTraingGrounds()
        geolocationStore.getLocation();
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
    methods: {},
});
</script>
