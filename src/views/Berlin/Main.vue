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
          <v-data-table :headers=this.headers :items=this.data_table_data :items-per-page="15" class="elevation-1"></v-data-table>
        </div>
        <div class="col">
          <apexchart width="800" type="bar" :options="options" :series="series"></apexchart>
          <div class="image-div">
            <a href="/berlin/maps/covid">
              <img class="image" src="/images/map.png" width="750px" alt="Map" />
              <p>show map</p>
            </a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="image-div">
          <a href="/berlin/maps/accidents">
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
  name: "Main",

  props: {},

  data () {
    return {}
  },

  methods: {},

  mounted() {},
};
</script>

<style scoped>
</style>
