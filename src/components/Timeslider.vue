<template>
  <div class="covidslider">
    
      <div class="row">
        <div class="col-8 vslider white rounded-lg">
          <v-slider v-model="index" :max="labels.length-1" ticks="always" tick-size="4" hide-details
                    thumb-label="always"
                    :thumb-size="70"
                    v-on:change="emitNewDate(index)">
            <template v-slot:thumb-label="{ value }">{{ labels[value] }}</template>
          </v-slider>

        </div>
        <div class="col-sm-auto white rounded-lg">
          <v-select
              v-model="mId" :menu-props="{ top: true, offsetY: true }" :items="months" item-text="name" item-value="id" hide-details dense
              v-on:change="getDatesForMonth(mId)">
          </v-select>
        </div>
      </div>
    
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
        m.push(e.split('.')[1]+'.'+e.split('.')[2])
      });
      var unique = m.filter((v, i, a) => a.indexOf(v) === i);
      unique.forEach(e => {
        let temp = e.split('.')
        let month = this.getMonth(temp[0])
        month.name = month.name + ', ' + temp[1]
        month.id = month.id + '.' + temp[1]
        this.months.push(month)
      })
      return unique
    },

    getMonth: function (d) {
      return d == '01' ? {id:'01', name:'January'} :
            d == '02' ? {id:'02', name:'February'} :
            d == '03' ? {id:'03', name:'March'} :
            d == '04' ? {id:'04', name:'April'} :
            d == '05' ? {id:'05', name:'May'} :
            d == '06' ? {id:'06', name:'June'} :
            d == '07' ? {id:'07', name:'July'} :
            d == '08' ? {id:'08', name:'August'} :
            d == '09' ? {id:'09', name:'September'} :
            d == '10' ? {id:'10', name:'October'} :
            d == '11' ? {id:'11', name:'November'} :
            d == '12' ? {id:'12', name:'December'} :
            'none'
    },

    getDatesForMonth: function (month) {
      if (month == 0) {
        this.labels = this.allDates
      }
      else {
        let m = this.allDates.filter(date => date.split('.')[1]+'.'+date.split('.')[2]==month)
        this.labels = m
      }
      this.dateLeft = this.labels[0].split('.').reverse().join('-')
      this.dateRight = this.labels[this.labels.length-1].split('.').reverse().join('-')

      this.updateAllowedDates()
      
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

      this.updateAllowedDates()

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
    },

    updateAllowedDates: function(){
      let left = this.getDatesInRange(this.allDates[0].split('.').reverse().join('-'), this.dateRight)
      let right = this.getDatesInRange(this.dateLeft, this.allDates[this.allDates.length-1].split('.').reverse().join('-'))
      this.allowedDatesLeft = this.getreverseLabels(left);
      this.allowedDatesRight = this.getreverseLabels(right);
    }

  },

  mounted() {
    this.index = this.startIndex;
    this.allDates = this.ticksLabels;

    this.getAllMonths();
    this.mId = this.months[this.months.length-1].id
    this.labels = this.allDates.filter(date => date.split('.')[1]+'.'+date.split('.')[2]==this.mId)

    this.dateRight = this.labels[this.labels.length-1].split('.').reverse().join('-')
    this.dateLeft = this.labels[0].split('.').reverse().join('-')

    this.updateAllowedDates()
  }

}
</script>

<style scoped>

.covidslider {
  width: 95%;
  margin: auto;
  margin-top: 1%;
  margin-bottom: 1%;
  max-height: 20%;
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
  width: 160px;
}
.vslider {
  z-index: 999;
  margin-right: 3rem;
}
.col-4 {
  margin-right: 5rem;
}
</style>
