<template>
  <div id="container">
    <div id="map">
      <BerlinCovidMapC />
    </div>
    <v-card id="card">
      <v-card-text>
        <CovidSlider />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import BerlinCovidMapC from "../components/BerlinCovidMapC"
import CovidSlider from "../components/CovidSlider";

export default {
  name: "BerlinCovidMapV",

  components: {
    BerlinCovidMapC,
    CovidSlider
  },

  data() {
    return {
      value: 0,
      selectedDate: 0,
      ticksLabels: [],
    };
  }
};
</script>

<style scoped>

  #container {
    max-width: 100%;
    max-height: 90%;
  }
  #map {
    width: 100%;
    height: 60%;
  }
  #card {
    width: 100%;
  }

</style>
