<template>
  <div>
    <div class="container-fluid border-bottom border-info" style="border-width: 5px !important">
      <div class="row">
        <div class="col">
          <img src="/images/berlin4.jpg" class="w-100 headerimage" alt="Berlin" />
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-9 mt-2">
          <apexchart width="100%" type="area" :options="options" :series="series"></apexchart>
        </div>
        <div class="col-3 mt-5">
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

export default {
  name: 'CovidPredictions',
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
