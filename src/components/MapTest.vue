<template>
  <div id="container">
    <div id="choice">
        <input type="radio" id="shop" name="map" value="1" v-on:change="showA()" checked>
        <label for="shop">Shops</label>
        <input type="radio" id="two" name="map" value="2" v-on:change="showB()">
        <label for="shop">Two</label>
    </div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>

import GeneralClasses from "../assets/GeneralClasses";
import L from "leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapTest",
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
      mapLayerC: {},
      datares: []
    };
  },

  methods: {

    init: function () {
      fetch(GeneralClasses.GETAPIberlinaccidents())
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
    },

    makeMarker: function () {
      this.mapLayerA.addLayer(L.marker([52.520008, 13.404954], {icon: this.marker}));
      this.mapLayerB.addLayer(L.marker([52.545204, 13.357080], {icon: this.marker}));
      this.mapLayerA.addTo(this.map)
      //this.init();
    },

    setupLeafletMap: function () {
      this.map = L.map("mapContainer", {
        center: [52.52, 13.405],
        zoom: 11,
        maxZoom: 13,
        minZoom: 10
      });

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    
      this.mapLayerA = L.layerGroup(false);
      this.mapLayerB = L.layerGroup(false);
      this.mapLayerC = L.layerGroup(false);

    },

    showA: function () {
      if(this.map.hasLayer(this.mapLayerB)) { this.map.removeLayer(this.mapLayerB)}
      if(this.map.hasLayer(this.mapLayerC)) { this.map.removeLayer(this.mapLayerC)}
      this.mapLayerA.addTo(this.map)
    },

    showB: function () {
      if(this.map.hasLayer(this.mapLayerA)) { this.map.removeLayer(this.mapLayerA)}
      if(this.map.hasLayer(this.mapLayerC)) { this.map.removeLayer(this.mapLayerC)}
      this.mapLayerB.addTo(this.map)
    }
  },

  mounted() {
    this.setupLeafletMap();
    this.makeMarker();      
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
  #map {
    width: 100%;
    height: 60%;
    margin-bottom: 5vh;
  }
  #slider {
    width: 100%;
    height: 30%;
  }
  #mapContainer {
  width: 80vw;
  height: 80vh;
}
</style>
