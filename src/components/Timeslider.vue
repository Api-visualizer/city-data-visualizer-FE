<template>
  <div class="covidslider">
  <v-app >
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
            <v-menu
              v-model="menuLeft"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formatStart"
                  readonly
                  solo
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dateLeft"
                no-title
                :allowed-dates="getAllowedDatesLeft"
                @input="menu = false"
                @change="newRange()"
              ></v-date-picker>
            </v-menu>
          </template>
          <template v-slot:append>
            <v-menu
              v-model="menuRight"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formatEnd"
                  readonly
                  solo
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dateRight"
                no-title
                :allowed-dates="getAllowedDatesRight"
                @input="menu = false"
                @change="newRange()"
              ></v-date-picker>
            </v-menu>
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
  </div>
</template>
<script>
export default {
  name: "Timeslider",

  props: ['startIndex','ticksLabels', 'id'],

  data(){
    return {
      menuLeft: false, 
      menuRight: false,
      allowedDatesLeft: [],
      allowedDatesRight: [],
      dateLeft: '',
      dateRight: '',
      index: 0,
      allDates: [],
      labels: [],
      months: [{id:'0', name:'All'}],
      mId: ''
    }
  },

  computed: {
    formatStart(){
      return this.dateLeft.split('-').reverse().join('.');
    },

    formatEnd(){
      return this.dateRight.split('-').reverse().join('.');
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
      this.dateLeft = this.labels[0].split('.').reverse().join('-')
      this.dateRight = this.labels[this.labels.length-1].split('.').reverse().join('-')

      let left = this.getDatesInRange(this.allDates[0].split('.').reverse().join('-'), this.dateRight)
      this.allowedDatesLeft = this.getreverseLabels(left)
      let right = this.getDatesInRange(this.dateLeft, this.allDates[this.allDates.length-1].split('.').reverse().join('-'))
      this.allowedDatesRight = this.getreverseLabels(right)
      
      this.index = 0
      let newDate = this.labels[0]
      this.bus.$emit(this.$props.id, newDate);
    },

    getDatesInRange(start, end) {
      let s = start.split('-').join('');
      let e = end.split('-').join('');

      let temp = this.allDates.filter(function(date) {
        return date.split('.').reverse().join('') >= s
      })
      temp = temp.filter(function(date) {
        return date.split('.').reverse().join('') <= e
      })
      return temp
    },

    newRange: function () {
      this.labels = this.getDatesInRange(this.dateLeft, this.dateRight)
      let left = this.getDatesInRange(this.allDates[0].split('.').reverse().join('-'), this.dateRight)
      this.allowedDatesLeft = this.getreverseLabels(left)
      let right = this.getDatesInRange(this.dateLeft, this.allDates[this.allDates.length-1].split('.').reverse().join('-'))
      this.allowedDatesRight = this.getreverseLabels(right)
      this.index = 0
      let newDate = this.labels[0]
      this.bus.$emit(this.$props.id, newDate);
    },

    getAllowedDatesLeft (val) {
        if (this.allowedDatesLeft.indexOf(val) !== -1 && this.allowedDatesLeft.indexOf(val) < this.allowedDatesLeft.length-1) {
          return true
        } else {
          return false
        }
    },

    getAllowedDatesRight (val) {
        if (this.allowedDatesRight.indexOf(val) !== -1 && this.allowedDatesRight.indexOf(val) > 0) {
          return true
        } else {
          return false
        }
    },

    getreverseLabels: function(data) {
      let temp = []
      data.forEach(function(el) {
        temp.push(el.split('.').reverse().join('-'))
      })
      return temp
    }

  },

  mounted() {
    this.index = this.startIndex;
    this.allDates = this.ticksLabels;

    this.getAllMonths();
    this.mId = this.months[this.months.length-1].id
    this.labels = this.allDates.filter(date => date.split('.')[1]==this.mId)

    this.allowedDatesLeft = this.getreverseLabels(this.labels);
    this.allowedDatesRight = this.getreverseLabels(this.labels);
    this.dateRight = this.labels[this.labels.length-1].split('.').reverse().join('-')
    this.dateLeft = this.labels[0].split('.').reverse().join('-')
  }

}
</script>

<style scoped>
  /deep/ .v-application--wrap {
  min-height: 0vh !important
}

.covidslider {
  width: 95%;
  margin: auto;
  margin-top: 1%;
  margin-bottom: 1%;
  max-height: 30%;
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
