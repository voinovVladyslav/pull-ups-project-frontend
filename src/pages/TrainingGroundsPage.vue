<template>
    <q-page class="row justify-center">
        <div class="flex items-center q-pa-md"
            style="min-width: 100%; max-height: 100px;">
            <TheFilters />
        </div>
        <div style="min-width: 100%;">
            <TrainingGroundCard v-for="tg in trainingGrounds" :key="tg.id"
                :tg="tg" @add-to-favorites="addToFavorites"
                @remove-from-favorites="removeFromFavorites" />
        </div>
        <div class="q-mb-md">
            <q-btn label="Load More" color="primary" :loading="loadingMore"
                @click="loadMore" :class="{ 'hidden': !moreAvailable }" />
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
            loadingMore: false,
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
        async loadMore() {
            this.loadingMore = true;
            await tgStore.loadMoreTrainingGrounds();
            this.loadingMore = false;
        }
    },
    computed: {
        trainingGrounds() {
            return tgStore.trainingGrounds
        },
        location() {
            return geolocationStore.location;
        },
        totalPages() {
            return tgStore.totalPages;
        },
        moreAvailable() {
            return tgStore.moreAvailable;
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
    },
});
</script>

<style scoped>
.hidden {
    display: none;
}
</style>
