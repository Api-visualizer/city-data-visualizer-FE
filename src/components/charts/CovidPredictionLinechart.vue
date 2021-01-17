<template>
  <div>
    <v-app>
      <v-select
        :items="dates"
        item-text="name"
        item-value="id"
        label="Select a Date"
      >
      </v-select>
    </v-app>
    <div id="chart">
      <apexchart
        height="400"
        type="line"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import GeneralClasses from "@/assets/GeneralClasses";
import "leaflet/dist/leaflet.css";

export default {
  name: "CovidPredictionLinechart",

  data() {
    return {
      realCaseLinechartDataset: [{ date: "", data: 0 }],
      predictedLinechartDataset: [{ date: "", data: 0 }],
      series: [],
      options: {},
    };
  },

  methods: {
    getPredictionData: function () {
      fetch(GeneralClasses.GetAPIBerlinCovidPredictions())
        .then((response) => response.json())
        .then((result) => {
          this.data = result;
          this.initializeDataForCharts(this.data);
          this.initializeDateLabels(this.data.data.doc.cases.x);
        });
    },

    initializeDataForCharts: function (result) {
      let realCasesOfLatestWeek = {
        x: result.data.doc.cases.x,
        y: result.data.doc.cases.y,
      };
      let predictedCasesOfLatestWeek = {
        x: result.data.doc.regression.x,
        y: result.data.doc.regression.y,
      };
      this.extractRealCaseDataForLinechart(realCasesOfLatestWeek);
      this.extractPredictedDataForLinechart(predictedCasesOfLatestWeek);
      this.options = this.initializeChartOptions();
      this.prepareDataForLinechart();
    },

    initializeDateLabels: function (dates) {
      dates.filter((item, pos) => {
        return this.dates.indexOf(item) == pos;
      });
    },

    extractPredictedDataForLinechart: function (data) {
      data.x.forEach((elem) => {
        this.predictedLinechartDataset.push({
          date: elem,
          data: data.y[data.x.indexOf(elem)],
        });
      });
      this.predictedLinechartDataset.shift();
    },

    extractRealCaseDataForLinechart: function (data) {
      data.x.forEach((elem) => {
        this.realCaseLinechartDataset.push({
          date: elem,
          data: data.y[data.x.indexOf(elem)],
        });
      });
      this.realCaseLinechartDataset.shift();
    },

    fulfillChartDatasets: function (
      realCaseLinechartDataset,
      predictedCaseLinechartDataset
    ) {
      this.series = [];
      this.series.push({
        name: "Predicted case",
        type: "line",
        data: predictedCaseLinechartDataset,
      });
      this.series.push({
        name: "Real case",
        type: "line",
        data: realCaseLinechartDataset,
      });
    },

    prepareDataForLinechart: function () {
      let predictedLinechartData = [];
      let realCaseLinechartData = [];
      this.predictedLinechartDataset.forEach((elem) => {
        predictedLinechartData.push({ x: elem.date, y: Math.round(elem.data) });
      });
      this.realCaseLinechartDataset.forEach((elem) => {
        realCaseLinechartData.push({ x: elem.date, y: elem.data });
      });
      this.fulfillChartDatasets(realCaseLinechartData, predictedLinechartData);
    },

    initializeChartOptions: function () {
      return {
        chart: {
          height: 400,
          type: "line",
        },
        fill: {
          type: "solid",
        },
        markers: {
          size: 0,
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
        yaxis: {
          title: {
            text: "Number of Cases",
          },
        },
        xaxis: {
          labels: {
            rotate: 0,
          },
          title: {
            text: "Date",
          },
        },
        title: {
          text: "Comparision between real cases and predicted cases",
          align: "left",
        },
        dataLabels: {
          enabled: false,
        },        
        stroke: {
          width: 2,
        },
        colors: ["#f22213", "#45cf0a"],
      };
    },
  },

  mounted() {
    this.getPredictionData();
  },
};
</script>

<style scoped>
/deep/ .v-application--wrap {
  min-height: 0vh !important;
}
</style>
