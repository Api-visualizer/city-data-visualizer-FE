<template>
  <div id="chart">
    <apexchart type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import GeneralClasses from "@/assets/GeneralClasses";
import "leaflet/dist/leaflet.css";
import Moment from 'moment';

export default {
  name: "CovidCasesLinechart",
  
  props: {
    width: Number,
    height: Number,
  },
  
  data () {
    return {
      data: {},
      options: {
        chart: {
          width: this.$props.width,
          height: this.$props.width,
          type: "line",      
        },
        xaxis: {
          categories: [""],
        },
        title: {
          text: "Weekly overview of Covd-19 cases per 100k",
          align: "left",
        },
        colors: ["#b80e01", "#315174", "#97e338", "#ae8522", "#dfb6c8", "#2d488f", "#671ed1", "#e31a59", "#15276d", "#46020e", "#42087f", "#f84d09"],
      },
      series: [],
    }
  },

  methods: {
    APIResult: function () {
      fetch(GeneralClasses.GETAPIberlincoviddistrict())
        .then(response => response.json())
        .then(data => this.sortDataByDate(data))
        .then(data => {          
          this.addDatesToCategories(data);
          this.addCasesToSeries(data);
        })  
    },

    sortDataByDate: function (data) {
      return data[0].sort((a, b) => new Moment(a.date, "DD.MM.YYYY") - new Moment(b.date, "DD.MM.YYYY"));
    },

    addDatesToCategories: function (data) {
      for (let item of data) this.options.xaxis.categories.push(item.date);
      this.options.xaxis.categories.shift();
    },

    addCasesToSeries: function (data) {
      for (let district of GeneralClasses.GETberlindistrics()) {
        let cases = [];
        for (let item of data) {
          let dailyItemByDistrict = item.data.features.filter(feature => feature.properties.GEN === district)[0];        
          cases.push(Math.round(dailyItemByDistrict.properties.cases_per_100k));
        }
        this.series.push({ name: district.replace("Berlin ", ""), data: cases });
      }
    },
  },

  mounted() {
    this.APIResult();
  },
};
</script>

<style scoped>
</style>
