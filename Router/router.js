import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import LandingPage from '../src/components/Main/LandingPage';

// Berlin
import Main from '../src/components/Main/Berlin/Main';
import KarteCorona from '../src/components/Main/Berlin/KarteCorona';

// Hamburg

// Munich

const routes = [
    {
        path :'*',
        redirect: '/'
    },
    { path: '/', component: LandingPage },
    { path: '/berlin', component: Main },
    { path: '/berlin/karte/corona', component: KarteCorona },
];
const router = new VueRouter({
    mode: 'history',
    routes
});
export default router;
