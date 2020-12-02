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
        { text: 'ID', value: 'id' },
        { text: 'Altersgruppe', value: 'altersgruppe' },
        { text: 'Fallzahl', value: 'fallzahl' },
        { text: 'Differenz', value: 'differenz' },
        { text: 'Inzidenz', value: 'inzidenz' },
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