<template>
  <div>
    <v-card id="card">
      <v-card-text>
        <div id="covidslider">
            <v-slider
                v-model="selectedDate"
                :tick-labels="ticksLabels"
                :max="ticksLabels.length-1"
                v-on:change="emitNewDate(ticksLabels[selectedDate])"
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

  props: ['selectedDate', 'ticksLabels'],
  methods: {
    emitNewDate: function (newDate) {
      this.bus.$emit('new-date', newDate);
    },
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