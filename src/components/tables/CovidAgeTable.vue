<template>
  <div id="table">
		<v-data-table :headers=this.headers :items=this.table_data :items-per-page="15" class="elevation-1"></v-data-table>
  </div>
</template>

<script>
import GeneralClasses from "@/assets/GeneralClasses";

export default {
  name: "CovidAgeTable",

  props: {},

  data () {
    return {
			table_data: [],
      headers: [
        { align: 'start', sortable: false, value: 'data'},
        { text: 'Age Group', value: 'altersgruppe' },
        { text: 'Number of Cases', value: 'fallzahl' },
        { text: 'Difference', value: 'differenz' },
        { text: 'Incidence', value: 'inzidenz' },
      ],
		}
  },

  methods: {
		APIResult: function () {
      this.$http.get(GeneralClasses.GETAPIberlincovidage()).then((result) => {
        let data = result.data[0][0]['data']
        this.table_data = data
      })
    },
  },

  mounted() {
    this.APIResult();
  },
};
</script>

<style scoped>
</style>
