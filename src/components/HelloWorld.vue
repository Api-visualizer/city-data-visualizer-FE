<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <l-map style="height: 500px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker v-for="(item, index) in markerLatLng" :key="'marker-' + index" :latLng="item"></l-marker>      
    </l-map>    
    <hr>
    <vue-good-table :columns="columns" :rows="rows" :pagination-options="{ enabled: true, perPage: 12, perPageDropdown: [12, 24 ] } "/>    
  </div>
</template>

<script>
import GeneralClasses from '../assets/GeneralClasses';
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data(){
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 4,
      center: [47.313220, -1.319482],
      markerLatLng: [],
      columns: [
        {
          label: 'ID',
          field: 'id',
          type: "number",          
          width: '50px',
        },
        {
          label: 'Name',
          field: 'name',
        },      
        {
          label: 'Adresse',
          field: 'adresse',
        },  
        {
          label: 'Plz',
          field: 'plz',
          type: "number",   
          width: '125px',                 
        },  
        {
          label: 'Bezirk',
          field: 'bezirk',
        },    
        {
          label: 'Lat',
          field: 'lat',
          sortable: false,
        },    
        {
          label: 'Long',
          field: 'long',
          sortable: false,          
        },                                          
      ],
      rows:[],
    }   
  },
  methods:
  {
    APIResult: function () {
      this.$http.get(GeneralClasses.GETAPI()).then((Result) => 
      { 
        this.rows = Result.data.index 
        for(let i = 0;i < this.rows.length;i++)
        {
          if(String(this.rows[i].lat) != "" || String(this.rows[i].long) != "")
          {
            var Item = new Array();          
            Item.lat=2 + i;
            Item.long=3 + i;
            this.markerLatLng.push(Item)
          }
        }
      });      
    },    
  },
  mounted(){
    this.APIResult();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
