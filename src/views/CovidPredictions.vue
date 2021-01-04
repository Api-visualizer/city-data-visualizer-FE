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
        <div class="col m-2">
          <apexchart width="800" type="line" :options="options" :series="series"></apexchart>
          <div class="col m-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">COVID-19</h5>
                <h6 class="card-subtitle mb-2 text-muted">Predicted Case Numbers</h6>
                <p class="card-text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                  <br /><br /> At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
              </div>
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

</style>
