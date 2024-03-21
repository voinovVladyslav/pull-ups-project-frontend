<template>
    <div>
        <h5 class="text-center q-pa-none q-mt-md q-mb-none">Add Training Ground
        </h5>
    </div>
    <div class="flex column q-pa-md">
        <q-toggle size="xl" v-model="create_pullupbar"
            label="With Pull Up Bar" />
        <q-toggle size="xl" v-model="create_dipstation"
            label="With Dip Station" />
    </div>
    <div class="flex q-px-md justify-around">
        <q-input outlined placeholder="Latitude" class="coordinates"
            v-model="latitude" />
        <q-input outlined placeholder="Longitude" class="coordinates"
            v-model="longitude" />
    </div>
    <div class="flex q-pa-md justify-around">
        <q-btn label="Fill Location" color="primary" :disable="!location"
            @click="fillCurrentLocation" class="button" />
        <q-btn label="Save" color="primary" class="button"
            :disable="!validation" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useGeolocationStore } from 'src/stores/geolocation';

const geolocationStore = useGeolocationStore();

export default defineComponent({
    name: 'AddTrainingGroundPage',
    setup() {
        geolocationStore.getLocation();
    },
    data: () => ({
        create_pullupbar: true,
        create_dipstation: true,
        latitude: null,
        longitude: null,
    }),
    methods: {
        fillCurrentLocation() {
            this.latitude = this.location.latitude;
            this.longitude = this.location.longitude;
        },
    },
    computed: {
        location() {
            return geolocationStore.location;
        },
        validation() {
            return (!!this.latitude && !!this.longitude) && (this.create_pullupbar || this.create_dipstation);
        },
    },
});
</script>

<style scoped>
.coordinates {
    max-width: 45%;
}

.button {
    width: 45%;
}
</style>
