<template>
    <q-page>
        <div>You on bar #{{ barId }}</div>
        <div>{{ bar }}</div>
    </q-page>
</template>
<script>
import { defineComponent } from "vue";
import { useBarsStore } from "src/stores/bars";
import { useRoute } from "vue-router";

const barsStore = useBarsStore();

export default defineComponent({
    name: "WorkoutPage",
    setup() {
        const route = useRoute();
        barsStore.getBardById(route.params.id);
    },
    computed: {
        barId() {
            return this.$route.params.id;
        },
        bar() {
            return barsStore.bar;
        },
    },
});
</script>
