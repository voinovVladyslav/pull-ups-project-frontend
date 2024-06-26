<template>
    <q-page class="q-pa-md default-page-container">
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
        <div class="q-pa-md row">
            <q-input class="col-8" type="number" v-model="reps" outlined
                placeholder="Number of repetitions" />
            <div class="col"></div>
            <q-btn class="col-3" label="Save" color="primary"
                @click="handleSave" :disable="!reps" />
        </div>
        <div>
            <h6 class="text-center q-mb-none q-mt-md">History</h6>
            <div class="q-px-lg q-mt-sm flex display-center justify-between">
                <div>Reps</div>
                <div class="q-ml-sm">Date</div>
                <div>Delete</div>
            </div>
        </div>
        <div class="q-px-md">
            <div v-if="show === 'pullup'">
                <CounterCard v-for="counter in pullupCounters" :key="counter.id"
                    :counter="counter" @delete="handleDeletePullUpCounter" />
                <div class="q-mb-md">
                    <q-btn label="Load More" color="primary"
                        :loading="pullup.loadingMore"
                        @click="loadMorePullupCounters"
                        :class="{ 'hidden': !morePullupCountersAvailable }" />
                </div>
            </div>
            <div v-if="show === 'dip'">
                <CounterCard v-for="counter in dipCounters" :key="counter.id"
                    :counter="counter" @delete="handleDeleteDipCounter" />
                <div class="q-mb-md">
                    <q-btn label="Load More" color="primary"
                        :loading="dip.loadingMore" @click="loadMoreDipCounters"
                        :class="{ 'hidden': !moreDipCountersAvailable }" />
                </div>
            </div>
        </div>
    </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTrainingGroundsStore } from 'src/stores/tg';
import { useCounterStore } from 'src/stores/counter';
import CounterCard from 'src/components/counter/CounterCard.vue';
import { notifyDanger } from 'src/utils/notify';

const tgStore = useTrainingGroundsStore();
const counterStore = useCounterStore();

export default defineComponent({
    name: 'WorkoutPage',
    components: {
        CounterCard,
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
                counterStore.getDipCounters();
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
        return {
            reps: null,
            pullup: {
                loadingMore: false,
            },
            dip: {
                loadingMore: false,
            }
        };
    },
    methods: {
        loadMorePullupCounters() {
            this.pullup.loadingMore = true;
            counterStore.loadMorePullUpCounters();
            this.pullup.loadingMore = false;
        },
        loadMoreDipCounters() {
            this.dip.loadingMore = true;
            counterStore.loadMoreDipCounters();
            this.dip.loadingMore = false;
        },
        async handleSave() {
            const payload = {
                reps: this.reps,
            };
            if (this.show === 'pullup') {
                const pullupRes = await counterStore.savePullUpCounter(payload);
                if (pullupRes) {
                    counterStore.pullup.pageNumber = 1;
                    await counterStore.getPullUpCounters();
                } else {
                    notifyDanger('Faled to save pull up result')
                }
            }
            if (this.show === 'dip') {
                const dipRes = await counterStore.saveDipCounter(payload);
                if (dipRes) {
                    counterStore.dip.pageNumber = 1;
                    await counterStore.getDipCounters();
                } else {
                    notifyDanger('Faled to save dip result')
                }
            }
            this.reps = null;
        },
        async handleDeletePullUpCounter(id) {
            const res = await counterStore.deletePullUpCounter(id);
            if (res) {
                await counterStore.getPullUpCounters();
            } else {
                notifyDanger('Failed to delete pull up result');
            }
        },
        async handleDeleteDipCounter(id) {
            const res = await counterStore.deleteDipCounter(id);
            if (res) {
                await counterStore.getDipCounters();
            } else {
                notifyDanger('Failed to delete dip result');
            }
        }
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
        morePullupCountersAvailable() {
            return counterStore.morePullupCountersAvailable;
        },
        dipCounters() {
            return counterStore.dip.counters;
        },
        moreDipCountersAvailable() {
            return counterStore.moreDipCountersAvailable;
        },
    }
});
</script>

<style scoped>
.hidden {
    display: none;
}
</style>
