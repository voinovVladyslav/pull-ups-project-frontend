<template>
    <q-card class="row q-ma-md justify-between">
        <q-card-section class="col-2 q-pa-sm">#{{ tg.id
            }}</q-card-section>
        <q-card-section class="col-2 q-pa-sm">Has pullup bar: {{ !!tg.pullupbar
            }}</q-card-section>
        <q-card-section class="col-2 q-pa-sm">Has dip station: {{
            !!tg.dipstation
        }}</q-card-section>
        <q-card-section class="col-2 q-pa-sm">Add to favorite: {{ tg.is_favorite
            }}</q-card-section>
        <q-card-section v-if="location" class="col-2 q-pa-sm">{{
            roundToTwoDigits(distance(location, tg.location.coordinates))
        }} km</q-card-section>
        <q-card-section v-else>
            <q-spinner size="sm" />
        </q-card-section>
        <q-card-actions>
            <q-icon>

            </q-icon>
        </q-card-actions>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { distance, roundToTwoDigits } from 'src/utils/coordinates';
import { useGeolocationStore } from 'src/stores/geolocation';

const geolocationStore = useGeolocationStore();

export default defineComponent({
    name: 'TrainingGroundCard',
    props: ['tg'],
    setup() {
        return {
            distance,
            roundToTwoDigits,
        };
    },
    computed: {
        location() {
            return geolocationStore.location;
        },
    },
})
</script>

<style scoped></style>
