import Vue from 'vue'
import App from './App.vue'
import router from './router';

import axios from 'axios'
Vue.prototype.$http = axios;

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
Vue.component('VueGoodTable', VueGoodTable);

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'
import RangeSlider from 'vue-range-slider'
import Vuetify from 'vuetify'
// index.js or main.js
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
Vue.prototype.bus = new Vue();

Vue.component('RangeSlider', RangeSlider);

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
