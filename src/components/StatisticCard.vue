<template>
    <q-card style="min-width: 150px;" class="text-center">
        <q-card-section style="padding-bottom: 0px;" class="text-capitalize">{{
            title }}</q-card-section>
        <q-card-section style="padding-top: 0px;">{{ value
        }}</q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'StatisticCard',
    props: ['title', 'value']
})
</script>
