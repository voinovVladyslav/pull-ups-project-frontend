<template>
    <q-page class="flex flex-center">
        <div v-if="location">
            {{ location.latitude }}
            {{ location.longitude }}
            {{ location.accuracy }}
        </div>
        <div v-for="bar in bars" :key="bar.id">
            {{ bar }}
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useBarsStore } from "src/stores/bars";
import { useGeolocationStore } from "src/stores/geolocation";

const authStore = useAuthStore();
const barsStore = useBarsStore();
const geolocationStore = useGeolocationStore();

export default defineComponent({
    name: "IndexPage",
    setup() {
        authStore.getProfileData();
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
    },
});
</script>
