<template>
  <v-app><v-autocomplete :items="SearchData" color="white" item-text="Value" label="Keywords"></v-autocomplete> </v-app>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      SearchData: [],
    };
  },

  computed: {},

  methods: {
    GetData: function () {
      this.$http.get('/images/SearchTerms.json').then((response) => {
        this.SearchData = response.data.SearchElements;
        console.log(this.SearchData);
      });
    },
  },

  mounted() {
    this.GetData();
  },
};
</script>

<style scoped>
</style>
