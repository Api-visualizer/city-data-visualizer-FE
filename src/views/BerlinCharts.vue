<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h1 class="title display-4">Berlin</h1>
          <img src="/images/berlin4.jpg" class="w-100 headerimage" alt="Berlin" />
        </div>
      </div>
    </div>
    <div class="container-fluid">
    <div class="row">
      <div class="col m-2">
        <v-data-table :headers=this.headers :items=this.data_table_data :items-per-page="15" class="elevation-1"></v-data-table>
      </div>
      <div class="col m-2">
        <apexchart width="800" type="bar" :options="options" :series="series"></apexchart>
        <!-- <div class="image-div">
          <a href="/berlin/karte/corona">
            <img class="image" src="/images/map.png" width="750px" alt="Map" />
            <p>show map</p>
          </a>
        </div> -->
      </div>
      <div class="col m-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">COVID-19</h5>
              <h6 class="card-subtitle mb-2 text-muted">Case numbers per age group</h6>
              <p class="card-text">Here you can easily determine the current distribution of COVID-19 cases in Berlin by age group. Age ranges are listed in the first and the corresponding number of COVID-19 cases in the second column. The third column shows you the difference in case numbers compared to the previous day, while the fourth column calculates the cumulative incidence per 100 000 inhabitants, which, among other things, is used to determine the current risk of infection as well as subsequent governmental policies.
              <br><br>The column chart makes the relative distribution of cases per age range even more transparent, revealing a fairly steady rise of cases peaking at ages 30-39 and dropping again towards the oldest and most vulnerable age groups.</p>
            </div>
          </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="image-div">
        <a href="/berlin/karte/accidents">
          <img class="image" src="/images/map_accident.PNG" height="80%" alt="Map" />
          <p>show map</p>
        </a>
      </div>
    </div>-->
  </div>
  </div>
</template>

<script>
import GeneralClasses from "../assets/GeneralClasses";
import "leaflet/dist/leaflet.css";

export default {
  name: "BerlinCharts",

  props: {},

  data () {
    return {
      data_table_data: [],
      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'data',
        },
        { text: 'Age Group', value: 'altersgruppe' },
        { text: 'Number of Cases', value: 'fallzahl' },
        { text: 'Difference', value: 'differenz' },
        { text: 'Incidence', value: 'inzidenz' },
      ],
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['<9', '10-14', '15-19', '20-24', '25-29',
            '30-39', '40-49', '50-59', '60-69', '70-79', '80+', ' unbekannt'],
        }
      },
      series: [{
        name: 'number of covid19 cases',
        data: []
      }],
      Type: ''
    }
  },

  methods: {
    APIResult: function () {
      this.$http.get(GeneralClasses.GETAPIberlincovidage()).then((Result) => {
        let data = Result.data[0][0]['data']
        let chart_data = []
        let value = 0
        let temp = 0
        for (let dat of data) {
          /*  Received data is not formatted properly,
              which is where ' Summe', ' 0-4' etc. originate from.
              Please refer to covid age json file in CouchDB for API specification.
          */
          if (dat['altersgruppe'] === ' Summe') {
            delete data[dat]
          } else {
            value = parseInt(dat['fallzahl'])
            if (dat['altersgruppe'] === ' 0-4') {
              temp = value
              chart_data.pop()
            }
            if (dat['altersgruppe'] === ' 5-9') {
              value = value + temp
              temp = 0
              chart_data.pop()
            }
            if (dat['altersgruppe'] === ' 80-89') {
              temp = value
            }
            if (dat['altersgruppe'] === ' 90+') {
              value = value + temp
              temp = 0
              chart_data.pop()
            }
            chart_data.push(value)
            console.log(chart_data)
          }
          this.data_table_data = data
          this.updateChart(chart_data)
        }
      })
    },

    updateChart(chart_data) {
      this.series = [{
        name: 'number of covid19 cases',
        data: chart_data
      }]
    }
  },

  mounted() {
    this.APIResult();
    //this.updateChart()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container-fluid .col {
  margin: 0;
  padding: 0;
}

.headerimage{
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

.image-div {
  transition: 0.2s;
}
.image-div {
  opacity: 0.7;
}
.image-div:hover {
  opacity: 1;
  transform: scale(1.03);
}

.display-4 {
  font-weight: bold;
}

a {
  color: black;
  font-size: larger;
}
</style>
