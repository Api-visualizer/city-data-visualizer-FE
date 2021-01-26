import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Landing from '@/views/Landing';
import Team from '@/views/Team'
import Faq from '@/views/Faq';
import AccidentsMap from '@/components/maps/AccidentsMap';
import HospitalsMap from '@/components/maps/HospitalsMap';
import CovidMap from '@/components/maps/CovidMap';
import BerlinCharts from '@/views/BerlinCharts';
import CancerCasesBarchart from '@/components/charts/CancerCasesBarchart';

const routes = [
    { path:'*', redirect: '/'},
    { path: '/', component: Landing },
    { path: '/faq', component: Faq },
    { path: '/team', component: Team },
    { path: '/infections', component: CovidMap },
    { path: '/covid-age', component: BerlinCharts },
    { path: '/accidents', component: AccidentsMap },
    { path: '/hospitals', component: HospitalsMap },
    { path: '/cancer', component: CancerCasesBarchart },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
