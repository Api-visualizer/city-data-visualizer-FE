<template>
  <div id="container">
    <div id="map">
      <BerlinMapCovid />
    </div>
    <div id="covidslider">
      <v-app>
        <v-card>
        </v-card>
        <v-card>
        <v-card-text>
        <v-slider
          v-model="selectedDate"
          :tick-labels="ticksLabels"
          :min="ticksLabels.length-14"
          :max="ticksLabels.length-1"
          v-on:change="emitNewDate(ticksLabels[selectedDate])"
          step="1"
          ticks="always"
          tick-size="1"
        ></v-slider>
      </v-card-text>
        </v-card>
      </v-app>
    </div>
  </div>
</template>

<script>

import GeneralClasses from "../assets/GeneralClasses";
import BerlinMapCovid from "../components/BerlinMapCovid"
import moment from "moment";
export default {
  name: "CovidSlider",
  components: {
    BerlinMapCovid
  },
  props: {
    msg: String,
  },

  data() {
    return {
      value: 0,
      selectedDate: 0,
      ticksLabels: [],
    };
  },

  methods: {
    todaysDate: function () {
      return moment().format("DD.MM.YYYY")
    },
    emitNewDate: function (newDate) {
      this.bus.$emit('new-date', newDate);
    }
  },

  mounted() {
    this.$http
        .get(GeneralClasses.GETAPIberlincoviddistrict())
        .then((res) => {
          res.data.forEach((d) => this.ticksLabels.push(d.date));

          this.ticksLabels.sort(function(a,b) {
            a = a.split('.').reverse().join('');
            b = b.split('.').reverse().join('');
            return a > b ? 1 : a < b ? -1 : 0;
          });
        })        
  },
};
</script>

<style scoped>

  #container {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  #map {
    width: 100%;
    height: 60%;
    margin-bottom: 5vh;
  }
  #slider {
    width: 100%;
    height: 30%;
  }
</style>
