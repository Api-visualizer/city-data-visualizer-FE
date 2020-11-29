<template>
  <div>
    <v-card id="card">
      <v-card-text>
        <div id="covidslider">
            <v-slider
                v-model="date"
                :tick-labels="ticksLabels"
                :max="ticksLabels.length-1"
                v-on:change="emitNewDate(ticksLabels[date])"
                step="1"
                tick-size="4"
            ></v-slider>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Timeslider",

  props: ['startIndex','ticksLabels'],

  data(){
    return{
    date: 0
    }
  },

  methods: {
    emitNewDate: function (newDate) {
      this.bus.$emit('new-date', newDate);
    },
  },

  mounted() {
    this.date = this.startIndex
  }

}
</script>

<style scoped>

#covidslider {
  width: 95%;
  height: 30%;
}
#card {
  width: 100%;
}

</style>