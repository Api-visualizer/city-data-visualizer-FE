<template>
  <div id="container">
    <div id="accidentsMapContainer"></div>
    <ul id="choice">
      <li>
        <input type="radio" id="shop" name="map" value="1" v-on:change="showLayerA()" checked>
        <label for="shop">2018</label>
      </li>
      <li>
        <input type="radio" id="two" name="map" value="2" v-on:change="showLayerB()">
        <label for="shop">2019</label>
      </li>
    </ul>
  </div>
</template>

<script>

import GeneralClasses from "@/assets/GeneralClasses";
import L from "leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat/dist/leaflet-heat";

export default {
  name: "AccidentsMap",

  props: {},

  data() {
    return {
      marker: icon({
        iconUrl: "/images/marker-icon.png",
      }),
      value: 0,
      map: {},
      mapLayerA: {},
      mapLayerB: {},
      dataResult: [],
    };
  },

  methods: {
    init: function () {
      return fetch(GeneralClasses.GETAPIberlinaccidents())
      .then(response => response.json())
      .then(data => {
        data[0].forEach(d => this.dataResult.push(d));
        this.createLayerA(data)
        this.createLayerB(data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    createLayerA: function (data) {
      let LL = []

      let count = 0
      for ( let acc of Object.entries(data[0][0].accidents)){
        acc.lat
        count++
      }

      for (var i = 0; i < count; i++){
        let lat = data[0][0].accidents[i].lat.replace(/,/g, '.')
        let long = data[0][0].accidents[i].long.replace(/,/g, '.')
        LL.push(L.latLng(lat, long));
      }
      this.mapLayerA.setLatLngs(LL); 
      this.mapLayerA.addTo(this.map)
    },

    createLayerB: function (data) {
      let LL = []

      let count = 0
      for ( let acc of Object.entries(data[0][1].accidents)){
        acc.lat
        count++
      }

      for (var i = 0; i < count; i++){
        let lat = data[0][1].accidents[i].lat.replace(/,/g, '.')
        let long = data[0][1].accidents[i].long.replace(/,/g, '.')
        LL.push(L.latLng(lat, long));
      } 
      this.mapLayerB.setLatLngs(LL);
    },

    setupLeafletMap: function () {
      this.map = L.map("accidentsMapContainer", {
        center: [52.52, 13.405],
        zoom: 11,
        maxZoom: 17,
        minZoom: 10
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    
      this.mapLayerA = L.heatLayer(false);
      this.mapLayerB = L.heatLayer(false);
    },

    showLayerA: function () {
      if(this.map.hasLayer(this.mapLayerB)) { this.map.removeLayer(this.mapLayerB)}
      this.mapLayerA.addTo(this.map)
    },

    showLayerB: function () {
      if(this.map.hasLayer(this.mapLayerA)) { this.map.removeLayer(this.mapLayerA)}
      this.mapLayerB.addTo(this.map)
    }
  },

  mounted() {
    this.setupLeafletMap();
    this.init();      
  },
};
</script>

<style scoped>
#container {
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 90%;
}

#accidentsMapContainer {
  width: 100vw;
  height: 80vh;
}

#choice {
  font-size: 1.4em;
  margin-top: 1rem;
}

li {
  display: inline;
}

li>input {
  width: 40px;
  height: 40px;
}
</style>
