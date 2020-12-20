<template>
  <div>
    <div class="container-fluid border-bottom border-info" style="border-width: 5px !important">
      <div class="row">
        <div class="col">
          <div class="title display-4 pl-5 pr-5 pt-2 pb-2 bg-light text-dark rounded-pill" style="opacity: 0.9">
            <span>Berlin</span>
            <br />
            <span><h4>Accidents</h4></span>
          </div>
          <img src="/images/berlin4.jpg" class="w-100 headerimage" alt="Berlin" />
        </div>
      </div>
    </div>
    <div id="container w-100">
      <div class="row p-5 rounded-pill">
        <div id="accidentsMapContainer"></div>
      </div>

      <div class="container">
        <v-app>
          <v-select :items="accidentTypes" v-model="accidentType" :dense="true" :menu-props="{ maxHeight: '150px' }" label="Select an accident type" v-on:change="getDataOnChange(year, accidentType)"> </v-select>
        </v-app>
        <ul id="choice">
          <li>
            <input type="radio" id="shop" name="map" value="2018" v-model="year" v-on:change="getDataOnChange(2018, accidentType)" checked />
            <label class="label" for="shop">2018</label>
          </li>
          <li>
            <input type="radio" id="two" name="map" value="2019" v-model="year" v-on:change="getDataOnChange(2019, accidentType)" />
            <label class="label" for="shop">2019</label>
          </li>
        </ul>
      </div>
      <div class="m-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Traffic Safety</h5>
            <h6 class="card-subtitle mb-2 text-muted">City-Wide Accident Locations</h6>
            <p class="card text p-2">
              This heat map offers a bird’s eye view of Berlin’s accident hot spots. As indicated in the key to the left, the annual number of accidents is displayed on a smooth and continuous spectrum of color, making it accurate and easy to comprehend.
              <br /><br />By zooming in, you can determine whether a particular street or crossing is safe to use or on the more dangerous side, which may help in choosing your daily routes, be it for runs or for commutes. Depending on your preferred mode of transportation, you can choose to only display accidents for cars, motorcycles, trucks, pedestrians or other, and even compare accident rates per year.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralClasses from '@/assets/GeneralClasses';
import L from 'leaflet';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat';

export default {
  name: 'AccidentsMap',

  props: {},

  data() {
    return {
      marker: icon({
        iconUrl: '/images/PIN-Gray.png',
        iconSize:     [30, 50],
        iconAnchor:   [15, 50]
      }),
      map: {},   
      filteredMapLayer: {},
      year: 2018,
      accidentTypes: ['Car', 'Bike', 'Motorcycle', 'Truck', 'Pedestrian', 'Other'],
      accidentType: 'All',
    };
  },

  methods: {
    getUrlWithComponentParams: function () {
      const baseURL = GeneralClasses.GETAPIberlinaccidents();
      let params = `?year=${this.year}`;
      if (this.accidentType != 'All') params = params + `&type=${this.accidentType.toLowerCase()}`;
      return baseURL + params;
    },

    getDataOnChange: function (year, type) {
      this.year = year;
      this.type = type;

      // Update map data
      this.addDataToMap();
    },

    addDataToMap: function () {      
      return fetch(this.getUrlWithComponentParams())
        .then((response) => response.json())
        .then((dat) => {
          const data = dat.data;        
          this.createLayer(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createLayer: function (data) {
      let LL = [];

      data.accidents.features.forEach(accident => {
        let lat = accident.geometry.coordinates[1];
        let long = accident.geometry.coordinates[0];
        LL.push(L.latLng(lat, long));
      })

      this.filteredMapLayer.setLatLngs(LL);
      this.filteredMapLayer.addTo(this.map);
      this.showLayer();
    },

    setupLeafletMap: function () {
      this.map = L.map('accidentsMapContainer', {
        center: [52.52, 13.405],
        zoom: 11,
        maxZoom: 17,
        minZoom: 10,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
          
      this.filteredMapLayer = L.heatLayer(false);
      
      let legend = this.customLegendControl();
      legend.addTo(this.map);

      this.mapLayer = L.layerGroup();
      this.map.addLayer(this.mapLayer);
    },

    customLegendControl: function () {
      let legend = L.control({ position: 'topleft' });
      legend.onAdd = function () {
        let colors = ['#956bff', '#94f3ff', '#6ff765', '#fffc33', '#dea004', '#bd1806'];

        let div = L.DomUtil.create('div', 'info legend'),
          grades = ['min', '', '', '', '', 'max'];
        let label = '<div class="mb-4"><strong>Number<br/>of accidents</strong></div>';
        div.innerHTML += label;

        for (let i = 0; i < grades.length; i++) {
          div.innerHTML += "<div class='text-left mt-1 mb-1'><div class='text-left text-dark p-1 mr-2' style='display:inline; opacity:0.7; background:" + colors[i] + "'>&nbsp;&nbsp;</div><div style='display:inline;'>" + grades[i].toUpperCase() + '</div></div>';
        }
        return div;
      };
      return legend;
    },

    showLayer: function () {
      this.filteredMapLayer.addTo(this.map);
    },
  },

  mounted() {
    this.setupLeafletMap();
    this.addDataToMap();
  },
};
</script>

<style scoped>
/deep/ .v-application--wrap {
  min-height: 0vh !important;
  width: 30%;
  margin-top: 0rem;
}
.container-fluid .col {
  margin: 0;
  padding: 0;
}

.headerimage {
  max-height: 15rem;
  object-fit: cover;
}

.title {
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 7.5rem;
  color: white;
  transform: translate(-50%, -50%);
}
.display-4 {
  font-weight: bold;
}

#container {
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 80%;
}

#accidentsMapContainer {
  box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.3);
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

li > input {
  width: 20px;
  height: 20px;
}
label {
  margin-left: 0.6rem;
}
</style>
