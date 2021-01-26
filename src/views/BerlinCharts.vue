<template>
  <div>
    <h2>Covid 19</h2>
    <h3>Covid 19 per age group</h3>
    <v-card class="card">
    <v-app class="app">
  <div class="back">
    <div class="app">
      <v-select
            class="white border rounded-lg"
            v-model="selectedDate"
            :items="dates"
            hide-details
            item-text="name"
            item-value="id"
            label="Select a Day"
            v-on:change="filterDataForDate(selectedDate)">
      </v-select>
    </div>
  <div class="container-fluid mr-4 mb-4">
    <div class="row">
      <div class="col">
        <v-data-table disable-sort :headers="this.headers" :items="this.data_table_data" :items-per-page="15" class="age"></v-data-table>
      </div>
      <div class="col">
        <apexchart width="800" type="bar" :options="options" :series="series" class="chart white"></apexchart>
          <Textbox :content="content" subtitle="Case numbers per age group" title="COVID-19" class="box" link="https://daten.berlin.de/datensaetze/covid-19-f%C3%A4lle-im-land-berlin-verteilung-nach-altersgruppen"/>
     </div>
    </div>
  </div>
 </v-card>
 </div>
</template>

<script>
import GeneralClasses from '../assets/GeneralClasses';
import 'leaflet/dist/leaflet.css';
import Textbox from "@/components/Textbox";

export default {
  name: 'BerlinCharts',
  components: {Textbox},
  props: {},

  data() {
    return {
      content: "Here you can easily determine the current distribution of COVID-19 cases in Berlin by age group. Age ranges are listed in the first and the corresponding number of COVID-19 cases in the second column. The third column shows you the difference in case numbers compared to the previous day, while the fourth column calculates the cumulative incidence per 100 000 inhabitants, which, among other things, is used to determine the current risk of infection as well as subsequent governmental policies. <br /><br />The column chart makes the relative distribution of cases per age range even more transparent, revealing a fairly steady rise of cases peaking at ages 30-39 and dropping again towards the oldest and most vulnerable age groups.</p>",
      dates: [],
      datasets: [],
      data_table_data: [],
      selectedDate: '29.11.2020',
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
          id: 'vuechart-example',
        },
        xaxis: {
          categories: ['<9', '10-14', '15-19', '20-24', '25-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+', ' unknown'],
        },
      },
      series: [
        {
          name: 'number of covid19 cases',
          data: [],
        },
      ],
      Type: '',
    };
  },

  methods: {
    APIResult: function () {
      this.$http.get(GeneralClasses.GETAPIberlincovidage()).then((Result) => {
        this.dates = this.extractDates(Result.data.data);
        this.datasets = Result.data.data;
        let initialData = Result.data.data[0].doc.data; //date: 22.11.2020
        this.initializeDatasetsForTableAndChart(initialData);
      })
    },

    filterDataForDate(date) {
      let filteredDataset = this.datasets.filter(dataset => dataset.doc.date === date)
      this.initializeDatasetsForTableAndChart(filteredDataset[0].doc.data);
    },

    initializeDatasetsForTableAndChart(data) {
      let chart_data = [];
      let value = 0;
      let temp = 0;
      for (let dat of data) {
        if (dat['altersgruppe'] === ' Summe') {
          delete data[dat];
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
            temp = value;
          }
          if (dat['altersgruppe'] === ' 90+') {
            value = value + temp
            temp = 0
            chart_data.pop()
          }
          chart_data.push(value)
        }
        this.data_table_data = data;
        this.updateChart(chart_data)
      }
    },
    extractDates(data) {
      let dates = [];
      for (let i = 0; i < data.length; i++) {
        dates.push(data[i].doc.date);
      }
      return dates;
    },

    updateChart(chart_data) {
      this.series = [
        {
          name: 'number of covid19 cases',
          data: chart_data,
        },
      ];
    },
  },

  mounted() {
    this.APIResult();
  },
};
</script>

<style scoped>

.back{
  background-color: white;
  background-image: url("data:image/svg+xml,%3Csvg width='504' height='288' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23477fcd' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E");

  background-repeat: repeat;
}

.container-fluid .col {
  margin: 0;
  padding: 0;
}

.headerimage {
  max-height: 15rem;
  object-fit: cover;
}

h2 {
  margin-top: 2rem;
}
h3 {margin-top: 2rem}
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

.box {
  margin: 2rem 3rem 0 4rem;
}
.chart {
  border-radius: .25rem;
  border: 1px solid rgba(0,0,0,.125);
  margin: 0 2rem 0 1rem;
  box-shadow: 12px 12px 4px 0px #477fcdbe;
}
.age {
  border-radius: .25rem;
  border: 1px solid rgba(0,0,0,.125);
  margin: 0 1rem 0 2rem;
  box-shadow: 12px 12px 4px 0px #477fcdbe;
}
.app {
  max-width: 12rem;
  padding-top: 1rem;
  margin-left: 2rem;
  margin-bottom: 1rem;
}

.v-input{
  padding: 12px;
}
.card {
  margin-top: 2rem;
}
</style>
