<template>
    <q-page>
        <div class="row">
            <div class="col-12">
                <h5 v-if="bar" class="text-center">
                    {{ bar.title }} (#{{ barId }})
                </h5>
                <h5 v-else class="text-center">You on bar #{{ barId }}</h5>
            </div>
            <div class="col-12">
                <q-form
                    class="q-pa-md row justify-around"
                    @reset="null"
                    @submit="addCounter"
                >
                    <q-input
                        inputmode="numeric"
                        label="Reps"
                        outlined
                        class="col-8"
                        v-model.number="reps"
                    ></q-input>
                    <q-btn
                        type="submit"
                        color="primary"
                        label="Save"
                        class="col-3"
                    >
                    </q-btn>
                </q-form>
            </div>
            <div class="col-12 row">
                <q-list class="col-12">
                    <q-item class="row justify-center">
                        <q-item-section class="col-4 text-center">
                            Reps
                        </q-item-section>
                        <q-item-section class="col-4 text-center">
                            When
                        </q-item-section>
                        <q-item-section class="col-4 text-center">
                            Delete
                        </q-item-section>
                    </q-item>
                    <div v-if="counters.length">
                        <q-item
                            v-for="counter in counters"
                            :key="counter.id"
                            class="row justify-center"
                        >
                            <q-item-section class="col-4 text-center">{{
                                counter.reps
                            }}</q-item-section>
                            <q-item-section class="col-4 text-center">{{
                                formatDate(counter.created_at)
                            }}</q-item-section>
                            <q-item-section class="col-4 text-center">
                                <q-btn
                                    flat
                                    icon="delete"
                                    @click="deleteCounter(counter.id)"
                                    style="margin: auto"
                                ></q-btn>
                            </q-item-section>
                        </q-item>
                    </div>
                    <div v-else>
                        <q-item>
                            <q-item-section class="text-center">
                                No records available
                            </q-item-section>
                        </q-item>
                    </div>
                </q-list>
            </div>
        </div>
    </q-page>
</template>
<script>
import { defineComponent } from "vue";
import { useBarsStore } from "src/stores/bars";
import { useCounterStore } from "src/stores/counter";
import { useRoute } from "vue-router";

const barsStore = useBarsStore();
const counterStore = useCounterStore();

export default defineComponent({
    name: "WorkoutPage",
    setup() {
        const route = useRoute();
        barsStore.getBardById(route.params.id);
        counterStore.bar_id = route.params.id;
        counterStore.getCounters();
    },
    data() {
        return {
            reps: null,
        };
    },
    methods: {
        async addCounter() {
            const payload = {
                reps: this.reps,
            };
            await counterStore.addCounter(payload);
            await counterStore.getCounters();
            this.reps = null;
        },
        async deleteCounter(id) {
            await counterStore.deleteCounter(id);
            await counterStore.getCounters();
        },
        formatDate(date) {
            const d = new Date(date);

            const datestring = `${d.getDate()}/${
                d.getMonth() + 1
            }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
            const datestrin =
                d.getDate() +
                "-" +
                (d.getMonth() + 1) +
                "-" +
                d.getFullYear() +
                " " +
                d.getHours() +
                ":" +
                d.getMinutes();
            return datestring;
        },
    },
    computed: {
        barId() {
            return this.$route.params.id;
        },
        bar() {
            return barsStore.bar;
        },
        counters() {
            return counterStore.counters;
        },
    },
});
</script>
