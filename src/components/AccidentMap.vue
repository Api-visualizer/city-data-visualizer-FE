<template>
  <div id="container">
    <div id="mapContainer"></div>
    <ul id="choice">
      <li>
        <input type="radio" id="shop" name="map" value="1" v-on:change="showA()" checked>
        <label for="shop">2018</label>
      </li>
      <li>
        <input type="radio" id="two" name="map" value="2" v-on:change="showB()">
        <label for="shop">2019</label>
      </li>
    </ul>
  </div>
</template>

<script>

import GeneralClasses from "../assets/GeneralClasses";
import L from "leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat/dist/leaflet-heat";

export default {
  name: "AccidentMap",
  props: {
    msg: String,
  },

  data() {
    return {
      marker: icon({
        iconUrl: "/images/marker-icon.png",
      }),
      value: 0,
      map: {},
      mapLayerA: {},
      mapLayerB: {},
      d: [],
      n: 8000
    };
  },

  methods: {

    init: function () {
      fetch(GeneralClasses.GETAPIberlinaccidents())
      .then(response => response.json())
      .then(data => {
        this.d = data
        this.makeA(data)
        this.makeB(data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    makeA: function (data) {
      let LL = []
      console.log(data[0][0].accidents.length)
      for (var i = 0; i < this.n; i++){
        let lat = data[0][0].accidents[i].lat.replace(/,/g, '.')
        let long = data[0][0].accidents[i].long.replace(/,/g, '.')
        LL.push(L.latLng(lat, long));
      } 
      this.mapLayerA.setLatLngs(LL); 
      this.mapLayerA.addTo(this.map)
    },

    makeB: function (data) {
      let LL = []
      for (var i = 0; i < this.n; i++){
        let lat = data[0][1].accidents[i].lat.replace(/,/g, '.')
        let long = data[0][1].accidents[i].long.replace(/,/g, '.')
        LL.push(L.latLng(lat, long));
      } 
      this.mapLayerB.setLatLngs(LL);
    },

    setupLeafletMap: function () {
      this.map = L.map("mapContainer", {
        center: [52.52, 13.405],
        zoom: 11,
        maxZoom: 17,
        minZoom: 10
      });

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    
      this.mapLayerA = L.heatLayer(false);
      this.mapLayerB = L.heatLayer(false);

    },

    showA: function () {
      if(this.map.hasLayer(this.mapLayerB)) { this.map.removeLayer(this.mapLayerB)}
      this.mapLayerA.addTo(this.map)
    },

    showB: function () {
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
    height: 100%;
  }
  #mapContainer {
  width: 100vw;
  height: 85vh;
  }
  #choice{
    font-size: 1.4em;
  }
  li{
    display: inline;
  }
  li>input{
    width: 40px;
    height: 40px;
  }
</style>
