<template>
    <q-card class="row q-ma-md justify-between" style="min-height: 80px;">
        <q-card-section class="col-1 q-pa-sm self-center">
            <span class="align-center">#{{ tg.id }}</span>
        </q-card-section>
        <q-card-section class="col-2 text-center self-center q-pa-xs">
            <span v-if="location">
                {{ roundToTwoDigits(distance(location, tg.location.coordinates))
                }} km
            </span>
            <span v-else>
                <q-spinner size="xs" />
            </span>
        </q-card-section>
        <q-card-section class="col-3 q-pa-sm self-center">
            <div class="row justify-center">
                <q-img v-if="!!tg.dipstation" class="col-3" src="dipstation.png"
                    width="32px" />
                <q-img v-if="!!tg.pullupbar" class="col-3" src="pullupbar.png"
                    width="32px" />
            </div>
        </q-card-section>
        <q-card-actions class="col-6 flex justify-center q-pa-none">
            <q-icon v-if="tg.is_favorite" name="fa-solid fa-star" size="md"
                color="yellow" class="cursor-pointer q-mx-sm" />
            <q-icon v-else name="fa-regular fa-star" size="md" color="yellow"
                class="cursor-pointer q-mx-sm" />
            <q-icon name="fa-solid fa-map-location" size="md" color="primary"
                class="cursor-pointer q-mx-sm" />
            <q-icon name="fa-solid fa-circle-play" size="md" color="primary"
                class="cursor-pointer q-mx-sm" />
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
