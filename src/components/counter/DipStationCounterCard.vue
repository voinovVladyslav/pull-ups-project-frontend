<template>
    <div class="card q-my-md">
        <div>{{ counter.reps }}</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DipStationCounterCard',
    props: {
        counter: {
            type: Object,
            required: true
        },
    },
    data() {
        return {};
    }
});
</script>

<style scoped>
.card {
    min-height: 50px;
    min-width: 314px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
}
</style>
