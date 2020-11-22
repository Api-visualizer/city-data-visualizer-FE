<template>
  <div>
    <div class="header">
      <img src="/images/berlin1.jpg" alt="Berlin" style="width:100vw; height:160px; object-fit:cover;">
      <h1 class="centered display-4">Übersicht</h1>
    </div>


    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="/images/berlin1.jpg" alt="Card image cap">
      <div class="card-body">
        <p class="card-text"></p>
      </div>
    </div>

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
export default {
  name: "BerlinOverview"  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
.header {
  position: relative;
  text-align: center;
  color: #FFF;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
