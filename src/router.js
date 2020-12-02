import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import LandingPage from './views/LandingPage';
import Team from './views/Team'

import BerlinOverview from './views/BerlinOverview';
import BerlinMapCovid from './views/BerlinMapCovid';
import AccidentMap from './views/AccidentMap'
import BerlinCharts from "@/views/BerlinCharts";
import HospitalMap from "@/views/HospitalMap";


const routes = [
    { path :'*', redirect: '/'},
    { path: '/', component: LandingPage },
    { path: '/berlin/faq', component: BerlinOverview },
    { path: '/berlin/charts', component: BerlinCharts },
    { path: '/berlin/karte/corona', component: BerlinMapCovid },
    { path: '/berlin/karte/accidents', component: AccidentMap},
    { path: '/berlin/karte/hospitals', component: HospitalMap },
    { path: '/team', component: Team }
];
const router = new VueRouter({
    mode: 'history',
    routes
});
export default router;
