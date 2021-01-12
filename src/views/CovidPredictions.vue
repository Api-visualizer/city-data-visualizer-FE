<template>
  <div>
    <div class="container-fluid border-bottom border-info" style="border-width: 5px !important;">
      <div class="row">
        <div class="col">
          <div class="title display-4 pl-5 pr-5 pt-2 pb-2 bg-light text-dark rounded-pill" style="opacity: 0.9">
            <span>Berlin</span>
            <br />
            <span><h4>Covid-19 Predictions</h4></span>
          </div>
          <img src="/images/berlin4.jpg" class="w-100 headerimage" alt="Berlin" />
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-8 m-2">
          <p>----- linechart here -----</p>
        </div>
        <div class="col m-2">
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
export default {
  name: "CovidPredictions"
}

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
