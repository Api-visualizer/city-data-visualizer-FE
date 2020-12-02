<template>
  <div>
    <CovidAgeBarchart />
    <CovidCasesLinechart />
  </div>
</template>

<script>
import CovidAgeBarchart from '@/components/charts/CovidAgeBarchart';
import CovidCasesLinechart from '@/components/charts/CovidCasesLinechart';

export default {
  name: "Main",

  components: {
    CovidAgeBarchart,
    CovidCasesLinechart
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
