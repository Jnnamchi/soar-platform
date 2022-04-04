<template>
  <div class="chart-container">
    <canvas :id="canvasName"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'RadarChart',
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
        labels: [
          'Eating',
          'Drinking',
          'Sleeping',
          'Designing',
          'Coding',
          'Cycling',
          'Running'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'My Second Dataset',
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        gridLines: {
          display: false
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        scale: {
        //   gridLines: {
        //     // display: false,
        //     backgroundColor: 'red',
        //     color: 'rgb(227, 227, 227)',
        //     lineWidth: 12
        //   },
        //   ticks: {
        //     display: false,
        //     fontSize: 10,
        //     min: this.getMinValue(),
        //     max: 100,
        //     suggestedMin: 0,
        //     suggestedMax: 1,
        //     maxTicksLimit: 1,
        //     lineWidth: 3,
        //   },
        //   pointLabels: {
        //     fontSize: 12,
        //   },
        //   angleLines: {
        //     display: false,
        //     lineWidth: 3
        //   }
        },
        legend: {
          display: false,
        }
      },
    }
  },
  methods: {
    initializeChart () {
      let ctx = document.getElementById(this.canvasName).getContext('2d')
      let config = {
        type: 'radar',
        data: this.chartData,
        // options: this.chartOptions,
        // data: this.data,
        options: this.options,
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
}
</style>