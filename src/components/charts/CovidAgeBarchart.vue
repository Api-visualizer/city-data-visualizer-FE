<template>
  <div id="chart">
    <apexchart type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import GeneralClasses from "@/assets/GeneralClasses";

export default {
  name: "CovidAgeBarchart",

  props: {
    width: Number,
    height: Number,
  },

  data () {
    return {
      data: {},
      options: {
        chart: {
					id: 'vuechart-example',
					width: this.$props.width,
          height: this.$props.width,
        },
        xaxis: {
          categories: ['<9', '10-14', '15-19', '20-24', '25-29',
            '30-39', '40-49', '50-59', '60-69', '70-79', '80+', ' unbekannt'],
        }
      },
      series: [{
        name: 'Number of Covid-19 cases',
        data: []
      }],
    }
  },

  methods: {
    APIResult: function () {
      this.$http.get(GeneralClasses.GETAPIberlincovidage()).then((Result) => {
        let chart_data = []
        let value = 0
        let temp = 0
        for (let dat of data) {
          if (dat['altersgruppe'] === ' Summe') {
            delete data[dat]
          } else {
            value = parseInt(dat['fallzahl'])

            if (dat['altersgruppe'] === ' 0-4') {
              temp = value
            }
            if (dat['altersgruppe'] === ' 5-9') {
              value = value + temp
              temp = 0
              chart_data.push(value)
            }
            if (dat['altersgruppe'] === ' 80-89') {
              temp = value
            }
            if (dat['altersgruppe'] === ' 90+') {
              value = value + temp
              temp = 0
              chart_data.push(value)
            }
            chart_data.push(value)
          }
        }
        this.updateChart(chart_data)
      })
    },

    updateChart(chart_data) {
      this.series = [{
        name: 'Number of Covid-19 cases',
        data: chart_data
      }]
    },
  },

  mounted() {
    this.APIResult();
  },
};
</script>

<style scoped>
</style>
