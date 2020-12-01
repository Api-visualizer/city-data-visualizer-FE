import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import LandingPage from '@/views/LandingPage';
import Team from '@/views/Team'
import Faq from '@/views/Faq';
import Main from '@/views/Main';
// import BerlinMapCovid from '@/views/BerlinMapCovid';
// import AccidentMap from '@/views/AccidentMap'
// import HospitalMap from '@/views/HospitalMap';

const routes = [
    { path :'*', redirect: '/'},
    { path: '/', component: LandingPage },
    { path: '/faq', component: Faq },
    { path: '/main', component: Main },
    { path: '/team', component: Team },
    // { path: '/berlin/karte/corona', component: BerlinMapCovid },
    // { path: '/berlin/karte/accidents', component: AccidentMap},
    // { path: '/berlin/karte/hospitals', component: HospitalMap },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
