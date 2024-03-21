<template>
    <q-page class="q-pa-md">
        <div class="flex justify-center align-center q-my-md">
            <h5 class="text-center q-my-none">Training Ground #{{ id }}</h5>
            <q-icon v-if="tg?.is_favorite" class="q-ml-sm"
                name="fa-solid fa-star" size="md" color="yellow" />
        </div>
        <div class="q-pa-md">
            <q-btn-group spread class="flex">
                <q-btn :disable="!tg?.pullupbar" label="Pull Ups"
                    @click="show = 'pullup'"
                    :color="show === 'pullup' ? 'primary' : 'white'"
                    :text-color="show === 'pullup' ? 'white' : 'black'" />
                <q-btn :disable="!tg?.dipstation" label="Dips"
                    @click="show = 'dip'"
                    :color="show === 'dip' ? 'primary' : 'white'"
                    :text-color="show === 'dip' ? 'white' : 'black'" />
            </q-btn-group>
        </div>
        <div>
            <div v-if="show === 'pullup'">
                <PullUpCounterCard />
                Pull Up:{{ pullupCounters.length }}
            </div>
            <div v-if="show === 'dip'">
                Dip : {{ dipCounters.length }}
                <DipStationCounterCard />
            </div>
        </div>
    </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTrainingGroundsStore } from 'src/stores/tg';
import { useCounterStore } from 'src/stores/counter';
import PullUpCounterCard from 'src/components/counter/PullUpCounterCard.vue';
import DipStationCounterCard from 'src/components/counter/DipStationCounterCard.vue';

const tgStore = useTrainingGroundsStore();
const counterStore = useCounterStore();

export default defineComponent({
    name: 'WorkoutPage',
    components: {
        PullUpCounterCard,
        DipStationCounterCard
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const show = ref(null);

        async function fetchData() {
            const id = route.params.id;
            await tgStore.getTrainingGround(id);
            if (!tgStore.trainingGround) {
                router.push('/');
            }
            if (tgStore.trainingGround.pullupbar) {
                counterStore.pullup.id = tgStore.trainingGround.pullupbar;
                counterStore.getPullUpCounters();
                show.value = 'pullup';
            }
            if (tgStore.trainingGround.dipstation) {
                counterStore.dip.id = tgStore.trainingGround.dipstation;
                counterStore.getDipStationCounters();
                if (show.value === null) {
                    show.value = 'dip';
                }
            }
        }
        fetchData();
        return {
            show,
        };
    },
    data() {
        return {};
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        tg() {
            return tgStore.trainingGround;
        },
        pullupCounters() {
            return counterStore.pullup.counters;
        },
        dipCounters() {
            return counterStore.dip.counters;
        }
    }
});
</script>
