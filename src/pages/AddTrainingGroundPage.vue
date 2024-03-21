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
        <q-input type="number" step="0.0001" min="-90" max="90" outlined
            placeholder="Latitude" class="coordinates" v-model="latitude" />
        <q-input type="number" min="-180" max="180" outlined
            placeholder="Longitude" class="coordinates" v-model="longitude" />
    </div>
    <div class="flex q-pa-md justify-around">
        <q-btn label="Fill Location" color="primary" :disable="!location"
            @click="fillCurrentLocation" class="button" />
        <q-btn label="Save" color="primary" class="button"
            :disable="!validation" @click="addTrainingGround" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useGeolocationStore } from 'src/stores/geolocation';
import { useTrainingGroundsStore } from 'src/stores/tg';

const geolocationStore = useGeolocationStore();
const tgStore = useTrainingGroundsStore();

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
        loading: false,
    }),
    methods: {
        fillCurrentLocation() {
            this.latitude = this.location.latitude;
            this.longitude = this.location.longitude;
        },
        async addTrainingGround() {
            const payload = {
                location: {
                    type: 'Point',
                    coordinates: [
                        Number.parseFloat(this.longitude),
                        Number.parseFloat(this.latitude),
                    ],
                },
                create_pullupbar: this.create_pullupbar,
                create_dipstation: this.create_dipstation,
            };
            this.loading = true;
            const response = await tgStore.addTrainingGround(payload)
            this.laoding = false;
            if (response) {
                this.$router.push('/');
            }
        }
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

<style lang="css">
.coordinates {
    max-width: 45%;
}

.button {
    width: 45%;
}


/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    appearance: textfield;
}
</style>
