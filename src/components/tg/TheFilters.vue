<template>
    <div class="q-px-md flex justify-around" style="min-width: 100%;">
        <q-btn class="filter_button" @click="favoritesOnly = !favoritesOnly"
            unelevated label="Favorites Only" bordered
            :color="favoritesOnly ? 'positive' : 'primary'"></q-btn>
        <q-btn class="filter_button" @click="showClosest = !showClosest"
            :disabled="!location" unelevated label="Closest First" bordered
            :color="showClosest ? 'positive' : 'primary'"></q-btn>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useTrainingGroundsStore } from "src/stores/tg";
import { useGeolocationStore } from "src/stores/geolocation";

const tgStore = useTrainingGroundsStore();
const geolocationStore = useGeolocationStore();

export default defineComponent({
    name: "TheFilters",
    data() {
        return {
            showClosest: false,
            favoritesOnly: false,
        };
    },
    computed: {
        location() {
            return geolocationStore.location;
        },
    },
    watch: {
        showClosest(newValue) {
            if (newValue) {
                tgStore.filters.referencePoint = this.location;
            } else {
                tgStore.filters.referencePoint = null;
            }
            tgStore.pagination.pageNumber = 1;
            tgStore.getTrainingGrounds();
        },
        favoritesOnly(newValue) {
            tgStore.filters.favorites_only = newValue;
            tgStore.pagination.pageNumber = 1;
            tgStore.getTrainingGrounds();
        },
    }
});

</script>

<style scoped>
.filter_button {
    min-width: 46%;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
}
</style>
