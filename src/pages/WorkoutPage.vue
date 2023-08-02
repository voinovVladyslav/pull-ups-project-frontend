<template>
    <q-page>
        <div>You on bar #{{ barId }}</div>
        <div>{{ bar }}</div>
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
