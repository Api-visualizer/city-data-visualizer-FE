<template>
  <div>
    <div class="header">
      <img src="/images/berlin1.jpg" alt="Berlin" style="width:100vw; height:160px; object-fit:cover;">
      <h1 class="centered display-4">Übersicht</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <div class="card" style="width: 22rem;">
            <img class="card-img-top" src="/images/covid_map.png" alt="covid map overview">      
            <div class="card-body text-left">
              <h5 class="card-title">COVID-19</h5>
              <p class="card-text text-justify">Here we present the latest open COVID-19 data. The data is based on surveys by the RKI and made available by the NPGEO (National Platform for Geographic Data).</p>
              <a href="berlin/karte/corona" class="btn btn-primary">Explore</a>
              <a href="https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0" class="btn btn-outlined">Source</a>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="card" style="width: 22rem;">
            <img class="card-img-top" src="/images/covid_map.png" alt="covid map overview">      
            <div class="card-body text-left">
              <h5 class="card-title">COVID-19</h5>
              <p class="card-text text-justify">Here we present the latest open COVID-19 data. The data is based on surveys by the RKI and made available by the NPGEO (National Platform for Geographic Data).</p>
              <a href="berlin/karte/corona" class="btn btn-primary">Explore</a>
              <a href="https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0" class="btn btn-outlined">Source</a>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="card" style="width: 22rem;">
            <img class="card-img-top" src="/images/covid_map.png" alt="covid map overview">      
            <div class="card-body text-left">
              <h5 class="card-title">COVID-19</h5>
              <p class="card-text text-justify">Here we present the latest open COVID-19 data. The data is based on surveys by the RKI and made available by the NPGEO (National Platform for Geographic Data).</p>
              <a href="berlin/karte/corona" class="btn btn-primary">Explore</a>
              <a href="https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0" class="btn btn-outlined">Source</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BerlinOverview"  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
.header {
  position: relative;
  text-align: left;
  color: #FFF;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
