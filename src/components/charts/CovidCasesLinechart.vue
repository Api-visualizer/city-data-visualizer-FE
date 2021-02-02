<template>
  <div>
    <h2>Covid-19</h2>
    <h3>Comparison between new cases and rolling 7-day average</h3>
    <div id="chart">
      <apexchart height="380" type="line" :options="options" :series="series"></apexchart>
      <div class="display-dates">
        <div class="startDate">{{ startDate }}</div>
        <div class="endDate">{{ endDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralClasses from '@/assets/GeneralClasses';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'CovidCasesLinechart',

  data() {
    return {
      startDate: '',
      endDate: '',
      realCaseLinechartDataset: [{ date: '', data: 0 }],
      trendLinechartDataset: [{ date: '', data: 0 }],
      series: [],
      options: {
        chart: {
          height: 400,
          type: 'line',
        },
        fill: {
          type: 'solid',
        },
        markers: {
          size: 0,
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center',
          floating: true,
          offsetY: 0,
          offsetX: -5,
        },
        yaxis: {
          title: {
            text: 'Number of Cases',
          },
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          labels: {
            rotate: 0,
            show: false,
          },
          title: {
            text: 'Date',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
        },
        colors: ['#45cf0a', '#f22213'],
      },
    };
  },

  methods: {
    getTrendData: function () {
      fetch(GeneralClasses.GetAPIBerlinCovidAverage())
        .then((response) => response.json())
        .then((result) => {
          this.data = result.data.doc.data;
          this.initializeDataForChart();
          this.setEdgeDays();
        });
    },

    initializeDataForChart: function () {
      let result = this.data;

      this.options = {
        series: [
          {
            name: 'New cases',
            data: result.cases,
          },
          {
            name: 'Rolling 7-day average',
            data: result.moving_average.map((item) => {
              return Number(item.toFixed(2));
            }),
          },
        ],
        xaxis: {
          categories: result.dates,
        },
        yaxis: [
          {
            labels: {
              formatter: function (val) {
                return val.toFixed(0);
              },
            },
          },
        ],
      };
    },

    setEdgeDays: function () {
      this.startDate = this.data.dates[0];
      this.endDate = this.data.dates[this.data.dates.length-1]
    },
  },

  mounted() {
    this.getTrendData();
  },
};
</script>

<style scoped>
/deep/ .v-application--wrap {
  min-height: 0vh !important;
}

.display-dates {
  display: flex;
  justify-content: space-between;
  margin-top: -30px;
  font-size: 14px;
}
h2 {
  margin-top: 1rem;
}
h3 {
  color: gray;
  margin-bottom: 3rem;
}
</style>
