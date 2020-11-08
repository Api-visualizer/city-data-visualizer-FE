import Vue from 'vue'
import App from './App.vue'
import router from '../Router/router';

import axios from 'axios'
Vue.prototype.$http = axios;

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
Vue.component('VueGoodTable', VueGoodTable);

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
