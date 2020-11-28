<template>
  <div id="container">
    <div id="map">
      <BerlinCovidMapC />
    </div>
    <v-card id="card">
      <v-card-text>
        <Timeslider v-model="selectedDate" :tick-labels="ticksLabels" :value="value" v-on:new-date="onChildClick"/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import GeneralClasses from "../assets/GeneralClasses";
import BerlinCovidMapC from "../components/BerlinCovidMapC"
import Timeslider from "../components/Timeslider";

export default {
  name: "BerlinCovidMapV",

  components: {
    BerlinCovidMapC,
    Timeslider
  },

  data() {
    return {
      value: 0,
      selectedDate: 0,
      ticksLabels: [],
      newDate: ''
    };
  },

  methods: {
    onChildClick (value) {
      this.newDate = value
    }
  },

  /*created() {
    this.bus.$on('new-date', () => {
      this.newDate = newDate
      setTimeout(() => {
        this.newDate = '';
      }, 3000);
    })
  },*/

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
              this.selectedDate = this.ticksLabels.length-1
            })
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
