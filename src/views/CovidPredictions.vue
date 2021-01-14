<template>
  <div>
    <div class="container-fluid border-bottom border-info" style="border-width: 5px !important">
      <div class="row">
        <div class="col">
          <div class="title display-4 pl-5 pr-5 pt-2 pb-2 bg-light text-dark rounded-pill" style="opacity: 0.9">
            <br />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">         
          <p><apexchart width="100%" type="area" :options="options" :series="series"></apexchart></p>
          <CovidPredictionLinechart />
          <CovidPredictionTable />
        </div>
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">COVID-19</h5>
              <h6 class="card-subtitle mb-2 text-muted">Predicted Case Numbers</h6>
              <p class="card-text">The predictions are based on the history of newly cases. We chose to use the polynomial regression method to find a suitable graph that neither underfits, nor overfits the data. We can use this graph to predict future number of cases and find certain trends. Factors like restriction policies by the senate or seasonality are not taken into consideration for this method.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralClasses from '@/assets/GeneralClasses';
import CovidPredictionLinechart from '@/components/charts/CovidPredictionLinechart';
import CovidPredictionTable from '@/components/tables/CovidCasesPrediction';



export default {
  name: 'CovidPredictions',
  components: { CovidPredictionLinechart, CovidPredictionTable },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [],
        },
      },
      series: [],
    };
  },
  mounted() {
    this.$http.get(GeneralClasses.GetAPIBerlinHospitalPredictions()).then((Response) => {
      var ArrayX = Response.data.data.doc.data.prediction.x;
      var ArrayY = Response.data.data.doc.data.prediction.y;

      var DataX = [];
      var DataY = [];

      for (let i = 0; i < ArrayX.length; i++) {
        DataX[i] = ArrayX[i];
      }

      for (let i = 0; i < ArrayY.length; i++) {
        DataY[i] = ArrayY[i];
      }
      (this.options = {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: ArrayX,
        },
      }),
        (this.series = [
          {
            name: 'Number of Covid-19 cases',
            data: ArrayY,
          },
        ]);
    });
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
.display-4 {
  font-weight: bold;
}

.info h4 {
  margin: 0 0 5px;
  color: #777;
}
</style>
