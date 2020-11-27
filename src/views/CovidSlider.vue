<template>
  <div id="container">
    <div id="map">
      <BerlinMapCovid />
    </div>
    <v-card id="card">
      <v-card-text>
        <div id="covidslider" >
        <v-slider
          v-model="selectedDate"
          :tick-labels="ticksLabels"
          :min="ticksLabels.length-14"
          :max="ticksLabels.length-1"
          v-on:change="emitNewDate(ticksLabels[selectedDate])"
          step="1"
          tick-size="1"
        ></v-slider>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import GeneralClasses from "../assets/GeneralClasses";
import BerlinMapCovid from "../components/BerlinMapCovid"

export default {
  name: "CovidSlider",
  
  components: {
    BerlinMapCovid
  },

  data() {
    return {      
      value: 0,
      selectedDate: 0,
      ticksLabels: [],
    };
  },

  methods: {
    emitNewDate: function (newDate) {
      console.log(newDate)
      this.bus.$emit('new-date', newDate);
    }
  },

  mounted() {
    fetch(GeneralClasses.GETAPIberlincoviddistrict())
      .then(response => response.json())
      .then(data => {               
        data[0].forEach((d) => this.ticksLabels.push(d.date));
          this.ticksLabels.sort(function(a,b) {
            a = a.split('.').reverse().join('');
            b = b.split('.').reverse().join('');
            return a > b ? 1 : a < b ? -1 : 0;
          });
          this.ticksLabels = this.ticksLabels.slice(this.ticksLabels.length-14);
        })        
  },
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
  #covidslider {
    width: 95%;
    height: 30%;
  }
  #card {
    width: 100%;
  }

</style>
