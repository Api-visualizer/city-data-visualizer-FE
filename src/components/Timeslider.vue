<template>
  <v-app id="covidslider">
    <v-card class="mt-10">
      <v-card-text>
        <v-slider
          v-model="index"
          :max="labels.length-1"
          ticks="always"
          tick-size="4"
          thumb-label="always"
          :thumb-size="70"
          v-on:change="emitNewDate(index)"
        >
          <template v-slot:thumb-label="{ value }">
            {{ labels[value] }}
          </template>
          <template v-slot:prepend>
            <div>{{labels[0]}}</div>
          </template>
          <template v-slot:append>
            <div>{{labels[labels.length-1]}}</div>
          </template>
        </v-slider>
        <v-select
          v-model="mId"
          :items="months"
          item-text="name"
          item-value="id"
          label="Month"
          v-on:change="getDatesForMonth(mId)"
        ></v-select>
      </v-card-text> 
    </v-card>
  </v-app>
</template>
<script>
export default {
  name: "Timeslider",

  props: ['startIndex','ticksLabels', 'id'],

  data(){
    return {
      index: 0,
      allDates: [],
      labels: [],
      months: [{id:'0', name:'All'}],
      mId: ''
    }
  },

  methods: {
    emitNewDate: function (index) {
      let newDate = this.labels[index]
      this.bus.$emit(this.$props.id, newDate);
    },

    getAllMonths: function () {
      let m = []
      this.allDates.forEach(e => {
        m.push(e.split('.')[1])
      });
      var unique = m.filter((v, i, a) => a.indexOf(v) === i);
      unique.forEach(e => this.months.push(this.getMonth(e)))
      return unique
    },

    getMonth: function (d) {
      return d == 1 ? {id:'1', name:'January'} :
            d == 2 ? {id:'2', name:'February'} :
            d == 3 ? {id:'3', name:'March'} :
            d == 4 ? {id:'4', name:'April'} :
            d == 5 ? {id:'5', name:'May'} :
            d == 6 ? {id:'6', name:'June'} :
            d == 7 ? {id:'7', name:'July'} :
            d == 8 ? {id:'8', name:'August'} :
            d == 9 ? {id:'9', name:'September'} :
            d == 10 ? {id:'10', name:'October'} :
            d == 11 ? {id:'11', name:'November'} :
            d == 12 ? {id:'12', name:'December'} :
            'none'
    },

    getDatesForMonth: function (month) {
      if (month == 0) {
        this.labels = this.allDates
      }
      else {
      let m = this.allDates.filter(date => date.split('.')[1]==month)
      this.labels = m
      }
      this.index = 0
      let newDate = this.labels[0]
      console.log(newDate)
      this.bus.$emit(this.$props.id, newDate);
    }
  },

  mounted() {
    this.index = this.startIndex;
    this.allDates = this.ticksLabels;
    this.labels = this.ticksLabels;
    this.getAllMonths()
  }

}
</script>

<style scoped>
#covidslider > .v-application--wrap {
  min-height: 0;
}

#covidslider {
  width: 95%;
  margin: auto;
  margin-top: 3%;
}

.v-card__text{
  display: flex;
  justify-content: space-between;
}

.v-card__text > *{
  padding: 1%;
}

.v-input__slider{
  flex: 1 1 80%;
}

.v-select{
  flex: 0 1 15%;
}
</style>
