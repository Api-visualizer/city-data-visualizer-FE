<template>
  <div>
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
        dates: [],
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
        this.dataOfPredictableDays = data.y.slice(data.y.length -7, data.y.length).map(elem => Math.round(elem));
        this.table_data = this.getPredictedDataWithDates(this.datesOfPredictableDays, this.dataOfPredictableDays)
    },

    getPredictedDataWithDates: function(dates, data) {
        let dataset = []
        for(let i = 0; i < dates.length; i++) {
            dataset.push({date: dates[i], prediction: data[i]})
        }
        return dataset;
    },        
  },

  mounted() {
    this.getCovidPredictions();
  },
};
</script>

<style scoped>
    /deep/ .v-application--wrap {
    min-height: 0vh !important
    }
</style>
