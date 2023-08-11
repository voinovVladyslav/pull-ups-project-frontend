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
import { defineComponent, ref, onMounted } from "vue";
import { useBarsStore } from "src/stores/bars";
import { useGeolocationStore } from "src/stores/geolocation";
import { useRoute } from "vue-router";

const geolocationStore = useGeolocationStore();
const barsStore = useBarsStore();

export default defineComponent({
    name: "EditPullUpBar",
    setup() {
        geolocationStore.getLocation();
        const title = ref(null);
        const longitude = ref(null);
        const latitude = ref(null);
        onMounted(async () => {
            const route = useRoute();
            const barId = route.params.id;
            const res = await barsStore.getBardById(barId);
            title.value = barsStore.bar.title;
            longitude.value = barsStore.bar.location.coordinates[0];
            latitude.value = barsStore.bar.location.coordinates[1];
        });
        return {
            title,
            longitude,
            latitude,
        };
    },
    data() {
        return {
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
            const response = await barsStore.editBar(this.bar.id, payload);
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
        bar() {
            return barsStore.bar;
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
