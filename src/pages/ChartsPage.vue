<template>
    <q-page class="q-pa-md">
        <h1>Charts</h1>
        <apexchart type="line" height="350" :options="chartOptions"
            :series="series"></apexchart>
    </q-page>
</template>


<script>
import { defineComponent } from 'vue';
import VueApexCharts from 'vue3-apexcharts'

export default defineComponent({
    name: "ChartsPage",
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            series: [{
                name: "Pull Ups",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }],
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
                title: {
                    text: 'Product Trends by Month',
                    align: 'left'
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
})

</script>
