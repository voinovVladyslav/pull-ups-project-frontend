<template>
    <q-card class="row q-ma-md justify-between"
        :class="{ 'favorite': tg.is_favorite }">
        <q-card-section class="col-2 q-pa-sm">Training Ground #{{ tg.id
            }}</q-card-section>
        <q-card-section class="col-2 q-pa-sm">Has pullup bar: {{ !!tg.pullupbar
            }}</q-card-section>
        <q-card-section class="col-2 q-pa-sm">Has dip station: {{
            !!tg.dipstation
        }}</q-card-section>
        <q-card-section class="col-2 q-pa-sm">Add to favorite: {{ tg.is_favorite
            }}</q-card-section>
        <q-card-section class="col-2 q-pa-sm">location: to be</q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'TrainingGroundCard',
    props: ['tg'],
})
</script>

<style scoped>
.favorite {
    border: 2px solid pink;
}
</style>
