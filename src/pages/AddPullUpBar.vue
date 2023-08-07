<template>
    <q-page>
        <h6 class="text-center q-my-md">Add new pull up bar</h6>
        <q-form
            @submit.prevent="submitForm"
            @reset="null"
            class="row justify-center"
        >
            <div class="col-12 row justify-center">
                <q-input class="col-10" v-model="title" label="Title"></q-input>
                <q-input
                    type="number"
                    min="-90"
                    max="90"
                    step="0.0000001"
                    class="col-10"
                    v-model="latitude"
                    label="Latitude*"
                    max-value="100"
                ></q-input>
                <q-input
                    type="number"
                    step="0.0000001"
                    min="-180"
                    max="180"
                    class="col-10"
                    v-model="longitude"
                    label="Longitude*"
                ></q-input>
            </div>
            <div class="col-12 row justify-around q-pa-md q-mt-md">
                <q-btn
                    type="submit"
                    unelevated
                    :loading="loading"
                    color="primary"
                    class="col-4"
                    label="Save"
                ></q-btn>
                <q-btn
                    type="button"
                    unelevated
                    :disable="!location"
                    color="primary"
                    class="col-4"
                    label="fill location"
                    @click="fillLocation"
                ></q-btn>
            </div>
        </q-form>
    </q-page>
</template>
<script>
import { defineComponent } from "vue";
import { useBarsStore } from "src/stores/bars";
import { useGeolocationStore } from "src/stores/geolocation";

const geolocationStore = useGeolocationStore();
const barsStore = useBarsStore();

export default defineComponent({
    name: "AddPullUpBar",
    setup() {
        geolocationStore.getLocation();
    },
    data() {
        return {
            longitude: null,
            latitude: null,
            title: null,
            loading: false,
        };
    },
    methods: {
        fillLocation() {
            this.longitude = this.location.longitude;
            this.latitude = this.location.latitude;
        },
        async submitForm() {
            this.loading = true;
            const payload = this.makePayload();
            console.log("payload:", payload);
            const response = await barsStore.addBar(payload);
            this.loading = false;
            if (!response) {
                return;
            }
            this.$router.push("/");
        },
        makePayload() {
            const payload = {
                location: {
                    type: "Point",
                    coordinates: [
                        Number.parseFloat(this.longitude),
                        Number.parseFloat(this.latitude),
                    ],
                },
                address: {
                    country: "string",
                    city: "string",
                    street: "string",
                    number: "string",
                    postal_code: "string",
                },
            };
            if (this.title) {
                payload["title"] = this.title;
            }
            return payload;
        },
    },
    computed: {
        location() {
            return geolocationStore.location;
        },
        isFormValid() {
            return !!this.latitude && !this.longitude;
        },
    },
});
</script>

<style lang="css">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
