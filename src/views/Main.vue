<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h1 class="display-4">Berlin</h1>
          <img src="/images/berlin-alex.jpg" class="w-100 headerimage" alt="Los Angeles" />
        </div>
      </div>
    </div>
    <div class="container-fluid m-4">
    <div class="row">
      <div class="col">
        <!-- <v-data-table :headers=this.headers :items=this.data_table_data :items-per-page="15" class="elevation-1"></v-data-table> -->
      </div>
      <div class="col">
        <!-- <apexchart width="800" type="bar" :options="options" :series="series"></apexchart> -->
        <div class="image-div">
          <a href="/berlin/karte/corona">
            <img class="image" src="/images/map.png" width="750px" alt="Map" />
            <p>show map</p>
          </a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="image-div">
        <a href="/berlin/karte/accidents">
          <img class="image" src="/images/map_accident.PNG" height="80%" alt="Map" />
          <p>show map</p>
        </a>
      </div>
    </div>          
  </div>
  </div>
</template>

<script>
export default {
  name: "BerlinCharts",
  
  props: {},
  
  data () {
    return {}
  },

  methods: {},

  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headerimage{
  max-height: 6rem;
  border-radius: 3rem;
  object-fit: cover;
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
</style>
