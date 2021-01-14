<template>
    <div>
      <apexchart width="100%" type="area" :options="options" :series="series"></apexchart>
      <v-app>
        <v-select
              v-model="selectedDate"
              :items="dates"
              item-text="name"
              item-value="id"
              label="Select a Day"
              v-on:change="filterDataForDate(selectedDate)">
        </v-select>
      </v-app>
        <div id="table">
                <v-data-table :headers=this.headers :items=this.table_data :items-per-page="7" class="elevation-1"></v-data-table>
        </div>
    </div>
</template>

<script>
import GeneralClasses from "@/assets/GeneralClasses";

export default {
  name: "CovidPredictionTable",

  props: {},

  data () {
    return {
        selectedDate: '', // new Date(Date.now()).toLocaleString().split(',')[0],
        dates: [],
        options: {
          chart: {
            id: 'vuechart-example',
          },
          xaxis: {
            categories: this.dates,
          },
        },
        series: [
          {
            name: 'Number of Covid-19 cases',
            data: this.table_data,
          },
        ],
        datesOfPredictableDays: [],
        dataOfPredictableDays: [],
        data: {},
        table_data: [],
        headers: [
                { text: 'Date', value: 'date' },
                { text: 'Prediction', value: 'prediction' },
            ],
		}
  },

  methods: {
    getCovidPredictions: function () {
        this.$http.get(GeneralClasses.GetAPIBerlinCovidPredictions()).then((result) => {
            this.data = result.data.data.doc.regression
            this.extractDatesAndDataOfPredictableWeekForTable(this.data)
            this.initializeDropdown(this.data)
        })
    },

    extractDatesAndDataOfPredictableWeekForTable: function(data) {
        this.datesOfPredictableDays = data.x.slice(data.x.length -7 , data.x.length);
        this.dataOfPredictableDays = data.y.slice(data.y.length -7, data.y.length);
        this.table_data = this.getPredictedDataWithDates(this.datesOfPredictableDays, this.dataOfPredictableDays)
    },

    getPredictedDataWithDates: function(dates, data) {
        let dataset = []
        for(let i = 0; i < dates.length; i++) {
            dataset.push({date: dates[i], prediction: data[i]})
        }
        return dataset;
    },

    initializeDropdown: function(data){
        this.selectedDate = data.x[data.x.length - 7]
        this.dates = data.x.slice(0, data.x.length - 7).reverse();
    },

    filterDataForDate: function(selectedDate) {
        this.datesOfPredictableDays = this.data.x.slice(this.data.x.indexOf(selectedDate), this.data.x.indexOf(selectedDate) +7)
        this.dataOfPredictableDays = this.data.y.slice(this.data.x.indexOf(selectedDate), this.data.x.indexOf(selectedDate) +7)
        this.table_data = this.getPredictedDataWithDates(this.datesOfPredictableDays, this.dataOfPredictableDays)
    },

  },

  mounted() {
    this.selectedDate = new Date(Date.now()).toLocaleString().split(',')[0]
    this.getCovidPredictions();
  }
};
</script>

<style scoped>
    /deep/ .v-application--wrap {
    min-height: 0vh !important
    }
</style>
