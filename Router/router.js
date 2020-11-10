import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import LandingPage from '../src/components/Main/LandingPage';
import Team from '../src/components/Team'

// Berlin
import Main from '../src/components/Main/Berlin/Main';
import KarteCorona from '../src/components/Main/Berlin/KarteCorona';

// Hamburg

// Munich

const routes = [
    { path: '/', component: LandingPage },
    { path: '/berlin', component: Main },    
    { path: '/berlin/karte/corona', component: KarteCorona },
    { path: '/team', component: Team }
];
const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;