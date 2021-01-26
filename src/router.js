import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Landing from '@/views/Landing';
import Team from '@/views/Team'
import Faq from '@/views/Faq';
import Main from '@/views/Main';
import AccidentsMap from '@/components/maps/AccidentsMap';
import HospitalsMap from '@/components/maps/HospitalsMap';
import CovidMap from '@/components/maps/CovidMap';
import BerlinCharts from '@/views/BerlinCharts';
import CancerCasesBarchart from '@/components/charts/CancerCasesBarchart';
import CovidPredictionLinechart from '@/components/charts/CovidPredictionLinechart';
import CovidPredictions from "@/views/CovidPredictions";
import CovidPredictionTable from '@/components/tables/CovidCasesPrediction';



const routes = [
    { path:'*', redirect: '/'},
    { path: '/', component: Landing },
    { path: '/faq', component: Faq },
    { path: '/team', component: Team },
    { path: '/main', component: Main },
    { path: '/main/infections', component: CovidMap },
    { path: '/main/covid-age', component: BerlinCharts },
    { path: '/main/accidents', component: AccidentsMap },
    { path: '/main/hospitals', component: HospitalsMap },
    { path: '/main/cancer', component: CancerCasesBarchart },
    { path: '/main/covid-predictions', component: CovidPredictions },
    { path: '/prediction-chart', component: CovidPredictionLinechart },
    { path: '/team', component: Team },
    { path: '/main/cancer', component: CancerCasesBarchart },
    { path: '/main/predictions', component: CovidPredictionTable }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
