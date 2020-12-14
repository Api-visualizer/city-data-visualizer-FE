<template>
  <div>
    <CovidAgeBarchart />
    <CovidAgeTable />
    <CovidCasesLinechart />  
    <CovidMap busId="covid" />
    <HospitalsMap busId="hospitals" />
    <AccidentsMap />
    <CancerCasesBarchart />
  </div>
</template>

<script>
import CovidAgeBarchart from '@/components/charts/CovidAgeBarchart';
import CovidCasesLinechart from '@/components/charts/CovidCasesLinechart';
import CovidAgeTable from '@/components/tables/CovidAgeTable';
import HospitalsMap from '@/components/maps/HospitalsMap'; 
import AccidentsMap from '@/components/maps/AccidentsMap';
import CovidMap from '@/components/maps/CovidMap';
import CancerCasesBarchart from '@/components/charts/CancerCasesBarchart';

export default {
  name: "Main",

  components: {
    CovidAgeBarchart,
    CovidCasesLinechart,
    CovidAgeTable,
    CovidMap,
    HospitalsMap,
    AccidentsMap,
    CancerCasesBarchart
  },

  props: {},

  data () {
    return {}
  },

  methods: {},

  mounted() {},
};
</script>

<style scoped>
</style>
