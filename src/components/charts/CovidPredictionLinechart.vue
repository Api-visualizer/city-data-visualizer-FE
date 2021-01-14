<template>
  <div id="chart">
    <apexchart height="400" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import GeneralClasses from "@/assets/GeneralClasses";
import "leaflet/dist/leaflet.css";

export default {
  name: "CovidPredictionLinechart",
  
  data () {
    return {
      linechartDataset: [{date: '', data: 0}],
      scatterDataset: [{date: '', data: 0}],
      series: [],
      options: {}
    }
  },

  methods: {
    getPredictionData: function () {
      fetch(GeneralClasses.GetAPIBerlinCovidPredictions())
        .then(response => response.json())
        .then(result => {
            let realCasesOfLatestWeek = { 
                x: result.data.doc.cases.x.slice(result.data.doc.cases.x.length -7, result.data.doc.cases.x.length),
                y: result.data.doc.cases.y.slice(result.data.doc.cases.y.length -7, result.data.doc.cases.y.length)
                }
            let predictedCasesOfLatestWeek = { 
                x: result.data.doc.regression.x.slice(result.data.doc.regression.x.length -7, result.data.doc.regression.x.length),
                y: result.data.doc.regression.y.slice(result.data.doc.regression.y.length -7, result.data.doc.regression.y.length)
                }
             this.extractDatasetForLinechart(realCasesOfLatestWeek)
             this.extractDatasetForScatter(predictedCasesOfLatestWeek)
             this.options = this.initializeChartOptions();
             this.fulfillChartDatasets(this.linechartDataset, this.scatterDataset)
             }) 
    },

    extractDatasetForScatter: function (data) {
        data.x.forEach(elem => {
            this.scatterDataset.push({date: elem, data: data.y[data.x.indexOf(elem)]})
        })
        this.scatterDataset.shift()
    },

    extractDatasetForLinechart: function (data) {
        data.x.forEach(elem => {
            this.linechartDataset.push({date: elem, data: data.y[data.x.indexOf(elem)]})
        })
        this.linechartDataset.shift()
    },

    fulfillChartDatasets: function (linechartDataset, scatterDataset) {
        let scatterData = []
        let linechartData = []
         scatterDataset.forEach(elem => {
            scatterData.push({x: elem.date, y: Math.round(elem.data)})
        });
        linechartDataset.forEach(elem => {
            linechartData.push({x: elem.date, y: elem.data})
        });

        this.series.push({name: "Predicted case", type: "scatter", data: scatterData});
        this.series.push({name: "Real case", type: "line", data: linechartData});
    },

    initializeChartOptions: function() {
        return {
            chart: {
                height: 400,
                type: 'line',
            },
            fill: {
                type:'solid',
            },
            markers: {
                size: 1
            },
            tooltip: {
                shared: true,
                intersect: false,
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
            yaxis: {
                title: {
                    text: 'Number of Cases'
                },
            },
            xaxis: {
                title: {
                    text: 'Date'
                },
                // min: 0,
                // max: 12,
                // tickAmount: 12
            },
            title: {
                text: "Comparision between real cases (line) and predicted cases (points)",
                align: "left"
            },
            dataLabels: {
                enabled: true,
            },
        }
    }
  },

  mounted() {
    this.getPredictionData();
  },
};
</script>

<style scoped>
</style>
