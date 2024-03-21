<template>
    <q-card class="row q-ma-md justify-between shadow card">
        <q-card-section
            class="col-3 q-py-md q-pl-md q-pr-none flex column items-start justify-center">
            <div class="align-center">#{{ tg.id }}</div>
            <div v-if="location">
                {{ roundToTwoDigits(distance(location, tg.location.coordinates))
                }} km
            </div>
            <div v-else>
                <q-spinner size="xs"></q-spinner>
            </div>
        </q-card-section>

        <q-card-section class="col-3 q-pa-none self-center">
            <div class="row justify-center">
                <q-img v-if="!!tg.dipstation" class="col-3" src="dipstation.png"
                    width="32px" />
                <q-img v-if="!!tg.pullupbar" class="col-3" src="pullupbar.png"
                    width="32px" />
            </div>
        </q-card-section>
        <q-card-actions class="col-6 flex justify-center q-pa-none">
            <q-icon v-if="tg.is_favorite" name="fa-solid fa-star" size="md"
                color="yellow" class="cursor-pointer q-mx-sm"
                @click="removeFromFavorites" />
            <q-icon v-else name="fa-regular fa-star" size="md" color="yellow"
                class="cursor-pointer q-mx-sm" @click="addToFavorites" />
            <q-icon name="fa-solid fa-map-location" size="md" color="primary"
                class="cursor-pointer q-mx-sm" @click="handleMapsLink" />
            <q-icon @click="navigate" name="fa-solid fa-circle-play" size="md"
                color="primary" class="cursor-pointer q-mx-sm" />
        </q-card-actions>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { distance, roundToTwoDigits, createLinkToGoogleMaps } from 'src/utils/coordinates';
import { useGeolocationStore } from 'src/stores/geolocation';

const geolocationStore = useGeolocationStore();

export default defineComponent({
    name: 'TrainingGroundCard',
    props: ['tg'],
    emits: ['add-to-favorites', 'remove-from-favorites'],
    setup() {
        return {
            distance,
            roundToTwoDigits,
        };
    },
    methods: {
        navigate() {
            const url = `/workout/${this.tg.id}`;
            this.$router.push(url);
        },
        addToFavorites() {
            this.$emit('add-to-favorites', this.tg.id);
        },
        removeFromFavorites() {
            this.$emit('remove-from-favorites', this.tg.id);
        },
        handleMapsLink() {
            if (!this.location) {
                console.log('No location');
                return
            }
            const link = createLinkToGoogleMaps(this.tg.location, this.location);
            window.open(link, '_blank');
        }
    },
    computed: {
        location() {
            return geolocationStore.location;
        },
    },
})
</script>

<style scoped>
.card {
    min-height: 100px;
    min-width: 314px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
}
</style>
