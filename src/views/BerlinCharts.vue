<template>
  <div>
    <div class="app">
      <v-select
            v-model="selectedDate"
            :items="dates"
            item-text="name"
            item-value="id"
            label="Select a Day"
            v-on:change="filterDataForDate(selectedDate)">
      </v-select>
    </div>
  <div class="container-fluid mr-4">
    <div class="row">
      <div class="col table">
        <v-data-table disable-sort :headers="this.headers" :items="this.data_table_data" :items-per-page="15" class="elevation-1"></v-data-table>
      </div>
      <div class="col">
        <apexchart width="800" type="bar" :options="options" :series="series" class="chart"></apexchart>
          <Textbox :content="content" subtitle="Case numbers per age group" title="COVID-19" class="box" />
     </div>
    </div>
  </div>
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
      selectedDate: '22.11.2020',
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
  margin: 0 3rem 0 2rem;
  box-shadow: 22px 22px 8px -3px #477FCD;
}
.elevation-1 {
  margin: 0 2rem 0 2rem;
}
.app {
  max-width: 12rem;
  margin-top: 1rem;
  margin-left: 3rem;
}
.table {
  box-shadow: 22px 22px 8px -3px #477FCD;
}
</style>
