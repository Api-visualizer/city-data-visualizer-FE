import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from '../src/components/HelloWorld';

const routes = [
    {
        path :'*',
        redirect: '/'
    },    
    { path: '/', component: Home },
];
const router = new VueRouter({
    mode: 'history',
    routes
});
export default router;