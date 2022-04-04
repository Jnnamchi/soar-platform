<template>
  <div class="chart-container">
    <canvas :id="canvasName"></canvas>
  </div>
</template>

<script>
// import moment from 'moment'
import Chart from 'chart.js';
// import axios from 'axios'

export default {
  name: 'DonutChart',
  props: {
    canvasName: String,
    chartData: Object,
    chartOptions: Object,
  },
  mounted: function () {
    this.initializeChart()
  },
  data () {
    return {
        radarChart: {},
        data: {
            datasets: [{
                data: [10, 20, 30]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Red',
                'Yellow',
                'Blue'
            ]
        },
        options: {
            cutoutPercentage: 70,
            legend: {
                display: false,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            }
        }
    }
  },
  methods: {
    initializeChart () {
      let ctx = document.getElementById(this.canvasName).getContext('2d')
      let config = {
            type: 'pie',
            // Real Datasets
            data: this.chartData,
            options: this.chartOptions,
            // Test Datasets
            // data: this.data,
            // options: this.options,
        }
      this.radarChart = new Chart(ctx, config)
    },
    updateChart(dataset) {
      if (dataset) {
          this.radarChart.config.data.datasets = dataset
      } else {
          this.radarChart.config.data.datasets = this.chartData
      }
      this.radarChart.update()
    },
  }
}
</script>

<style scoped>
.chart-container{
  width: 100%;
  height: 100%;
  /* height: calc(100% - 20px); */
}
</style>