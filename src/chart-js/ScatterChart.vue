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
  name: 'ScatterChart',
  props: {
    canvasName: String,
    chartData: Array,
    chartOptions: Object,
  },
  mounted: function () {
    this.initializeChart()
  },
  data () {
    return {
      scatterChart: {}
    }
  },
  methods: {
    initializeChart () {
      let ctx = document.getElementById(this.canvasName).getContext('2d')
      this.scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: this.chartData,
        },
        options: this.chartOptions,
      })
    },
    updateChart(dataset) {
      if (dataset) {
          this.scatterChart.config.data.datasets = dataset
      } else {
          this.scatterChart.config.data.datasets = this.chartData
      }
      this.scatterChart.update()
    }
  }
}
</script>

<style scoped>
.chart-container{
  width: 100%;
  height: calc(100% - 20px);
}
</style>