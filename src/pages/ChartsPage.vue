<template>
    <q-page class="q-pa-md">
        <h4>Pullups</h4>
        <apexchart v-if="!loading" type="line" height="350"
            :options="chartOptions" :series="pullupsSeries"></apexchart>
        <q-spinner v-else />
        <h4>Dips</h4>
        <apexchart v-if="!loading" type="line" height="350"
            :options="chartOptions" :series="dipsSeries"></apexchart>
        <q-spinner v-else />
    </q-page>
</template>


<script>
import { defineComponent, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts'
import { useChartsStore } from 'src/stores/charts';
import { renderDateTime } from 'src/utils/datetime';

const chartsStore = useChartsStore();

export default defineComponent({
    name: "ChartsPage",
    components: {
        apexchart: VueApexCharts,
    },
    setup() {
        const loading = ref(false);
        async function loadData() {
            loading.value = true;
            await chartsStore.getDips();
            await chartsStore.getPullups();
            loading.value = false;
        }
        loadData();
        return {
            loading,
        }
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: true
                },
                stroke: {
                    curve: 'straight'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'],
                        opacity: 0.5
                    },
                },
            },

        }
    },
    computed: {
        dipsSeries() {
            return [{
                name: "Dips",
                data: chartsStore.dips.map(dip => {
                    return {
                        x: renderDateTime(dip.created_at),
                        y: dip.reps
                    }
                }).reverse()
            }];
        },
        pullupsSeries() {
            return [{
                name: "Pull Ups",
                data: chartsStore.pullups.map(
                    pullup => {
                        return {
                            x: renderDateTime(pullup.created_at),
                            y: pullup.reps
                        }
                    }
                ).reverse()
            }];
        }
    }
})

</script>
