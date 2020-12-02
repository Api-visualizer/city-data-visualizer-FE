import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Landing from '@/views/Landing';
import Team from '@/views/Team'
import Faq from '@/views/Faq';
import Main from '@/views/Main';
// import AccidentsMapView from '@/views/Berlin/AccidentsMapView';
// //import ChartsView from "./views/Berlin/ChartsView";
// import CovidMapView from "./views/Berlin/CovidMapView";
// import HospitalMapView from '@/views/Berlin/HospitalMapView';


const routes = [
    { path :'*', redirect: '/'},
    { path: '/', component: Landing },
    { path: '/faq', component: Faq },
    { path: '/main', component: Main },
    { path: '/team', component: Team },
//    // { path: 'berlin/charts', component: ChartsView},
//     { path: '/berlin/maps/covid', component: CovidMapView },
//     { path: '/berlin/maps/accidents', component: AccidentsMapView},
//     { path: '/berlin/maps/hospitals', component: HospitalMapView },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
