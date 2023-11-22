<template>
    <div class="row items-start q-gutter-md justify-center">
        <StatisticCard v-for="[title, value] in statistics" :key="title"
            :title="normalizeTitle(title)" :value="value">
        </StatisticCard>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import StatisticCard from './StatisticCard.vue';

export default defineComponent({
    name: 'DisplayStatistics',
    components: {
        StatisticCard
    },
    props: ['stats'],
    computed: {
        statistics() {
            return Object.entries(this.stats);
        }
    },
    methods: {
        normalizeTitle(title) {
            return title.replaceAll('_', ' ')
        }
    }
})
</script>
