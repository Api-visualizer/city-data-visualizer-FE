<template>
  <div id="container">
    <div id="accidentsMapContainer"></div>
      <div class="container">
        <div class="row">
          <div class="col-7">
            <ul id="choice">
              <li>
                <input type="radio" id="shop" name="map" value="2018" v-model="year" v-on:change="getDataOnChange(2018,accidentType)" checked>
                <label class="label" for="shop">2018</label>
              </li>
              <li>
                <input type="radio" id="two" name="map" value="2019" v-model="year" v-on:change="getDataOnChange(2019,accidentType)">
                <label class="label"  for="shop">2019</label>
              </li>
            </ul>
          </div>
  <!-- </div> -->
            <v-app>
              <div class="col-7">
                <v-select
                  :items="accidentTypes" v-model="accidentType" :dense="true" :menu-props="{ maxHeight: '150px'}"
                  label="Select an accident type" v-on:change="getDataOnChange(year,accidentType)">
                </v-select>
              </div>
            </v-app>
        </div>
      </div>
    <div class="col m-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Traffic Safety</h5>
          <h6 class="card-subtitle mb-2 text-muted">City-Wide Accident Locations</h6>
          <p class="card text p-2">
            This heat map offers a bird’s eye view of Berlin’s accident hot spots. As indicated in the key to the left, the annual number of accidents is displayed on a smooth and continuous spectrum of color, making it accurate and easy to comprehend.
            <br><br>By zooming in, you can determine whether a particular street or crossing is safe to use or on the more dangerous side, which may help in choosing your daily routes, be it for runs or for commutes. Depending on your preferred mode of transportation, you can choose to only display accidents for cars, motorcycles, trucks, pedestrians or other, and even compare accident rates per year.
          </p>
        </div>
      </div>
    </div>
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
      year: 2018,
      map: {},
      filteredMapLayer: {},
      mapLayerA: {},
      mapLayerB: {},
      dataResult: [],
      accidentTypes: ["All","Car", "Bike", "Motorcycle", "Truck", "Pedestrian", "Other"],
      accidentType: 'All'
    };
  },

  methods: {
    getDataOnChange: function(year, type) {
      if(type == "All" && year == 2018) {
        this.showLayerA();
      } else if (type == "All" && year == 2019) {
        this.showLayerB();
      } else {
        return fetch("https://cdv-backend.api.datexis.com/api/v1/berlin-accidents?year="+year+"&type="+type.toLowerCase())
        .then(response => response.json())
        .then(data => {
          this.createLayer(data);
        })
      }
    },

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

    createLayer: function (data) {
      let LL = []

      let count = 0
      for ( let acc of data){
        acc[1].lat
        count++
      }
      for (var i = 0; i < count; i++){
        let lat = data[i][1].lat.replace(/,/g, '.')
        let long = data[i][1].long.replace(/,/g, '.')
        LL.push(L.latLng(lat, long));
      }
      this.filteredMapLayer.setLatLngs(LL);
      this.filteredMapLayer.addTo(this.map)
      this.showLayer();
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
      this.filteredMapLayer = L.heatLayer(false);
      let legend = this.customLegendControl();
      legend.addTo(this.map);

      this.mapLayer = L.layerGroup();
      this.map.addLayer(this.mapLayer)
    },

    customLegendControl: function () {
      let legend = L.control({ position: 'topleft' });
      legend.onAdd = function () {
        let colors = ['#956bff', '#94f3ff', '#6ff765', '#fffc33', '#dea004', '#bd1806']

        let div = L.DomUtil.create('div', 'info legend'),
            grades = ['min', '','','', '', 'max'];
        let label = '<div class="mb-4"><strong>Number of accidents </strong></div>'
        div.innerHTML += label

        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<h6 class="text-left">' +
              '<i class ="info" style="background:' + colors[i] +'">' + '</i>' + grades[i] + "</h6>";
        }
        return div;
      };
      return legend;
    },

    showLayer: function() {
      if(this.map.hasLayer(this.mapLayerB)) { this.map.removeLayer(this.mapLayerB)}
      if(this.map.hasLayer(this.mapLayerA)) { this.map.removeLayer(this.mapLayerA)}
      this.filteredMapLayer.addTo(this.map);
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
/deep/ .v-application--wrap {
  min-height: 0vh !important;
  width: 30%;
  margin-top: 0rem;
}
.row {
  height: 4rem;
}

#container {
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 80%;
}

#accidentsMapContainer {
  width: 100vw;
  height: 75vh;
}

#choice {
  font-size: 1.2em;
  margin-top: 0.7rem;
}

li {
  display: inline;
  margin-right: 2vw;
}

li>input {
  width: 20px;
  height: 20px;
}
label {
  margin-left: 0.6rem;
}
</style>
