<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <CovidCasesLinechart />
        </div>
      </div>
      <div class="row">
        <div class="col-8 my-2 mx-auto">
          <v-card>
            <div class="card-body">
              <h5 class="card-title">COVID-19</h5>
              <h6 class="card-subtitle mb-2 text-muted">Total Cases with Rolling Average</h6>
              <span v-html="content"></span><br><br>
              <a href='https://services7.arcgis.com/mOBPykOjAyBO2ZKk/ArcGIS/rest/services/Covid19_RKI_Sums/FeatureServer' class="card-link">Where is this data from?</a>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CovidCasesLinechart from '@/components/charts/CovidCasesLinechart';
// import CovidPredictionTable from '@/components/tables/CovidCasesPrediction';


export default {
  name: 'CovidAverage',
  components: { CovidCasesLinechart },
  data() {
    return {
      content: "The number of new Covid-19 cases is summed up by all of Berlin's district cases. The moving average takes the past days, adds them up and divides by the number of weekdays. Since there's no special boundary condition, we calculate 0 into the average, if prior dates did not exist. This removes extreme changes of values and provides a more coherent overview.",
    };
  },
}
</script>

<style scoped>
.container-fluid .col {
  margin: 0;
  padding: 0;
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
.table {
  box-shadow: 22px 22px 8px -3px #477FCD;
}
</style>
