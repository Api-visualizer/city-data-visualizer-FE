<template>
  <div>
    <h1>Berlin</h1>
    <div class="container pb-4">
      <div class="row">
        <div class="col">
          <div class="p-1">            
            <h2><a href="/berlin/karte/corona">Detailansicht</a></h2>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";

export default {
  name: "BerlinOverview",
  props: {
    msg: String,
  }  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
</style>
