<template>
    <div>
      <div class="container-fluid border-bottom border-info" style="border-width: 5px !important;">
      <div class="row">
        <div class="col">
          <div class="title display-4 pl-5 pr-5 pt-2 pb-2 bg-light text-dark rounded-pill" style="opacity: 0.9">
            <br />
          </div>
        </div>
      </div>
    </div>    
    <div id="chart">
      <apexchart type="bar" height="450" :options="options" :series="series"></apexchart>
    </div>
    <v-app>
        <v-select :items="years" v-model="selectedYear" :dense="true" :menu-props="{ maxHeight: '150px' }" label="Select year" v-on:change="getDataOnChange(selectedYear)"> </v-select>
    </v-app>
    <div class="col m-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Cancer</h5>
          <h6 class="card-subtitle mb-2 text-muted">Case numbers per year</h6>
          <p class="card text p-2">This chart shows you how the number of cancer patients has developed through the years 2008 until 2017.
            The chart has many functionalities which let you be able to investigate the exact information which you may need about cancer in Berlin, 
            for example you can see the number of patients according to their age and gendre AND see the total number of patients for each age group of people.  
            You can filter the results (accourding to the selected year) to see the difference and the development of the number of cancer patients. 
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GeneralClasses from "@/assets/GeneralClasses";
import "leaflet/dist/leaflet.css";

export default {
    name: "CancerCasesBarchart",

    props: {

    },
    data() {
        return {
            data: {},
            years: [],
            selectedYear: '2008',
            ages: [],
            options: {
              chart: {
                type: 'bar',
              },
              title: {
                text: "Yearly overview of Cancer cases per Age range",
                align: "left",
                },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  endingShape: 'rounded'
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: [""],
                title: {
                  text: 'Age of patients'
                }
              },
              yaxis: {
                title: {
                  text: 'Number of cancer patients'
                }
              },
              fill: {
                opacity: 1
              },

              tooltip: {
                y: {
                  formatter: function (val) {
                    return  val + " patients"
                  }
                }
              }
          },
          series: [],
    }
  },
  methods: {
      getCancerCases: function () {
        fetch(GeneralClasses.GetAPIBerlinCancerCases())
        .then(response => response.json())
        .then(data => {
          this.data = data.data;
          this.initializeYears(data.data)
          this.initializeAgeRanges(data.data)
          })
      },

    initializeYears: function (data) {
      Object.entries(data).forEach(dataset => this.years.push(dataset[0]));
    },
    
    initializeAgeRanges: function (data) {
      Object.entries(data)[0][1].forEach(dataset => this.ages.push(dataset.age));
      this.ages[this.ages.length -1] = "95 and older";
      this.addDatesToCategories(this.ages);
      this.initializeSeries(data);
    },

    addDatesToCategories: function (ages) {
      ages.forEach(age => {
        this.options.xaxis.categories.push(age);
      })
      this.options.xaxis.categories.shift();
    },

    addCasesToSeries: function (data) {
      let femaleCases = this.getDataPerGendre(data, "female");
      let maleCases = this.getDataPerGendre(data, "male");
      let totalCases = this.getDataPerGendre(data, "total");
      this.series.push(
        { name: 'Female', data: femaleCases },
        { name: 'Male', data: maleCases },
        { name: 'Total', data: totalCases },
        );
    },

    getDataPerGendre: function(data, gendre) {
      let countSet = [];
      data.forEach(d => countSet.push(d[gendre]))
      return countSet;  
    },

    getDataOnChange: function(selectedYear) {
      let filteredData = Object.entries(this.data).filter(dataset => dataset[0] === selectedYear);
      this.series = [];
      this.addCasesToSeries(filteredData[0][1]);
    },

    initializeSeries: function (data) {
      this.addCasesToSeries(Object.entries(data)[0][1])
    }
  },

  mounted() {
      this.getCancerCases();
  }
}
</script>

<style scoped>
  /deep/ .v-application--wrap {
    min-height: 0vh !important;
    width: 30%;
    margin-top: 0rem;
  }

  .container-fluid .col {
  margin: 0;
  padding: 0;
}

.headerimage {
  max-height: 15rem;
  object-fit: cover;
}

.title {
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 7.5rem;
  color: white;
  transform: translate(-50%, -50%);
}
.display-4 {
  font-weight: bold;
}
</style>