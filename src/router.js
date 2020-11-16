import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import LandingPage from './views/LandingPage';
import Team from './views/Team'

// Berlin
import BerlinOverview from './views/BerlinOverview';
import BerlinMapCovid from './views/BerlinMapCovid';

// Hamburg

// Munich

const routes = [
    {
        path :'*',
        redirect: '/'
    },
    { path: '/', component: LandingPage },
    { path: '/berlin', component: BerlinOverview },
    { path: '/berlin/karte/corona', component: BerlinMapCovid },
    { path: '/team', component: Team }
];
const router = new VueRouter({
    mode: 'history',
    routes
});
export default router;
