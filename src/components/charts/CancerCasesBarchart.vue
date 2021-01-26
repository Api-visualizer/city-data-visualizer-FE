<template>
  <div>
    <h2>Cancer cases</h2>
    <h3>Yearly overview of cancer cases per age range</h3>
    <div class="card">
      <div class="row">
        <div>
          <div class="app">
            <v-select :items="years" v-model="selectedYear" :dense="true" :menu-props="{ maxHeight: '150px' }" label="Select year" v-on:change="getDataOnChange(selectedYear)"> </v-select>
          </div>
          <div class="row">
            <div class="col-8">
              <div id="chart">
                <apexchart type="bar" height="450" :options="options" :series="series"></apexchart>
              </div>
            </div>
            <div class="col-3">
              <div class="card cardbox">
                <div class="card-body">
                  <h5 class="card-title">Cancer</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Case numbers per year</h6>
                  <span v-html="content"></span><br><br>
                  <a href='http://www.gsi-berlin.info/gsi_suchen.asp?seite=2&CBFest=Suchtext&Suchtext=tg0800373100202008%2Exls&Modus=9' class="card-link">Where is this data from?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GeneralClasses from '@/assets/GeneralClasses';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'CancerCasesBarchart',
  components: { },
  props: {},
  data() {
    return {
      content: 'This chart shows you how the number of cancer patients has developed through the years 2008 until 2017. The chart has many functionalities which enable you to investigate the exact information which you may need about cancer in Berlin, for example you can see the number of patients according to their age and gender as well as the total number of patients for each age group of people. You can filter the results (according to the selected year) to see the difference and the development of the number of cancer patients.',
      data: {},
      years: [],
      selectedYear: '2008',
      ages: [],
      options: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [''],
          title: {
            text: 'Age of patients',
          },
        },
        yaxis: {
          title: {
            text: 'Number of cancer patients',
          },
        },
        fill: {
          opacity: 1,
        },

        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' patients';
            },
          },
        },
      },
      series: [],
    };
  },
  methods: {
    getCancerCases: function () {
      fetch(GeneralClasses.GetAPIBerlinCancerCases())
        .then((response) => response.json())
        .then((data) => {
          this.data = data.data;
          this.initializeYears(data.data);
          this.initializeAgeRanges(data.data);
        });
    },

    initializeYears: function (data) {
      Object.entries(data).forEach((dataset) => this.years.push(dataset[0]));
    },

    initializeAgeRanges: function (data) {
      Object.entries(data)[0][1].forEach((dataset) => this.ages.push(dataset.age));
      this.ages[this.ages.length - 1] = '95 and older';
      this.addDatesToCategories(this.ages);
      this.initializeSeries(data);
    },

    addDatesToCategories: function (ages) {
      ages.forEach((age) => {
        this.options.xaxis.categories.push(age);
      });
      this.options.xaxis.categories.shift();
    },

    addCasesToSeries: function (data) {
      let femaleCases = this.getDataPerGendre(data, 'female');
      let maleCases = this.getDataPerGendre(data, 'male');
      let totalCases = this.getDataPerGendre(data, 'total');
      this.series.push({ name: 'Female', data: femaleCases }, { name: 'Male', data: maleCases }, { name: 'Total', data: totalCases });
    },

    getDataPerGendre: function (data, gendre) {
      let countSet = [];
      data.forEach((d) => countSet.push(d[gendre]));
      return countSet;
    },

    getDataOnChange: function (selectedYear) {
      let filteredData = Object.entries(this.data).filter((dataset) => dataset[0] === selectedYear);
      this.series = [];
      this.addCasesToSeries(filteredData[0][1]);
    },

    initializeSeries: function (data) {
      this.addCasesToSeries(Object.entries(data)[0][1]);
    },
  },

  mounted() {
    this.getCancerCases();
  },
};
</script>

<style scoped>
h2 {
  margin-top: 3rem;
}
h3 {
  margin-bottom: 2rem;
}
/deep/ .v-application--wrap {
  min-height: 0vh !important;
  width: 30%;
  margin-top: 0rem;
}
.container-fluid .col {
  margin: 0;
  padding: 0;
}
.row {
  margin: 3rem 3rem 2rem 3rem;
}
#chart {
  box-shadow: 12px 12px 4px 0px #477fcdbe;
}
.box {
  margin-left: 3rem;
  height: 100%;
}
.cardbox  {
  margin: 0 2rem 0 2rem;
  box-shadow: 12px 12px 4px 0px #477fcdbe;
  height: 98%;
}
.app {
  width: 10rem;
  margin-left: 4rem;
  padding: 15px;
  min-height: 0vh;
  margin-top: 0rem;
  height: 20px;
}
</style>
