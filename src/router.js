import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Landing from '@/views/Landing';
import Team from '@/views/Team'
import Faq from '@/views/Faq';
import Main from '@/views/Main';

const routes = [
    { path :'*', redirect: '/'},
    { path: '/', component: Landing },
    { path: '/faq', component: Faq },
    { path: '/main', component: Main },
    { path: '/team', component: Team },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
