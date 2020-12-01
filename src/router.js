import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import LandingPage from '@/views/LandingPage';
import Team from '@/views/Team'
import Faq from '@/views/Faq';
import BerlinMapCovid from '@/views/BerlinMapCovid';
import AccidentMap from '@/views/AccidentMap'
import Main from '@/views/Main';
import HospitalMap from '@/views/HospitalMap';

const routes = [
    { path :'*', redirect: '/'},
    { path: '/', component: LandingPage },
    { path: '/berlin', component: Faq },
    { path: '/berlin/charts', component: Main },
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
