<template>
  <div>
    <div id="container">
      <div class="row p-5 rounded-pill">
        <div id="accidentsMapContainer"></div>
        <Textbox :content="content" title="Traffic Safety" subtitle="City-Wide Accident Locations" class="box" />
      </div>

      <div class="container">
        <v-app>
          <v-row>
            <v-col class="selection">
              <v-select :items="accidentTypes" v-model="accidentType" :dense="true" :menu-props="{ maxHeight: '150px' }" label="Select an accident type" v-on:change="getDataOnChange(year, accidentType)"> </v-select>
            </v-col>
          </v-row>
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
    </div>
  </div>
</template>

<script>
import GeneralClasses from '@/assets/GeneralClasses';
import L from 'leaflet';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat';
import Textbox from "@/components/Textbox";

export default {
  name: 'AccidentsMap',
  components: { Textbox },
  props: {},

  data() {
    return {
      content: "This heat map offers a bird’s eye view of Berlin’s accident hot spots. As indicated in the key to the " +
          "left, the annual number of accidents is displayed on a smooth and continuous spectrum of color, making it " +
          "accurate and easy to comprehend.<br /><br />By zooming in, you can determine whether a particular street or " +
          "crossing is safe to use or on the more dangerous side, which may help in choosing your daily routes, be it " +
          "for runs or for commutes. Depending on your preferred mode of transportation, you can choose to only display " +
          "accidents for cars, motorcycles, trucks, pedestrians or other, and even compare accident rates per year.",
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
      info: {},
      weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };
  },

  methods: {
    getUrlWithComponentParams: function () {
      const baseURL = GeneralClasses.GETAPIberlinaccidents();
      let params = `?year=${this.year}`;
      if (this.accidentType != 'All') params = params + `&type=${this.accidentType.toLowerCase()}`;
      return baseURL + params;
    },

    arrayAvg: function (array) {
      return Math.round(array.reduce((a,b) => a + b, 0) / array.length);
    },

    prettifyInfoBoxStrings: function (months, days, hours) {
      return {
        avgMonth: this.months[this.arrayAvg(months)],
        avgDay: this.weekDays[this.arrayAvg(days)],
        avgHour: this.arrayAvg(hours)+":00"
      }
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

      let totalAccidents = data.accidents.features.length;
      let months = [];
      let hours = [];
      let days = [];

      // Add data and push to stats
      data.accidents.features.forEach(accident => {
        let lat = accident.geometry.coordinates[1];
        let long = accident.geometry.coordinates[0];
        LL.push(L.latLng(lat, long));

        months.push(accident.properties.meta.UMONAT);
        hours.push(accident.properties.meta.USTUNDE);
        days.push(accident.properties.meta.UWOCHENTAG);
      })

      // Add infobox text
      const { avgMonth, avgDay, avgHour } = this.prettifyInfoBoxStrings(months, days, hours);
      this.info.update({ totalAccidents, avgMonth, avgHour, avgDay });

      // Add map layer
      this.filteredMapLayer.setLatLngs(LL);
      this.filteredMapLayer.addTo(this.map);
      this.showLayer();
    },

    createInfoBox: function () {
      let info = L.control({ position: "bottomleft" });

      info.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info', ); // create a div with a class "info"
        this.reset();
        return this._div;
      }

      info.update = function (stats) {
        this.reset();

        const { totalAccidents, avgMonth, avgHour, avgDay } = stats;
        this._div.innerHTML += `<br><br><p>Number of Accidents: ${totalAccidents}</p>` +
          `<p>Average month: ${avgMonth}</p>` +
          `<p>Average hour: ${avgHour}</p>` +
          `<p>Average day: ${avgDay}`
      };

      info.reset = function () {
        this._div.innerHTML = '<b>Data statistics:</b>';
      }

      this.info = info;
      info.addTo(this.map);
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

        let div = L.DomUtil.create('div', 'info legend')
        let label = '<div class="mb-4"><strong>Number<br/>of accidents</strong></div>';
        div.innerHTML += label;

        div.innerHTML += `
        <div class='container'>
          <div class='row'>
            <div class='gradient mr-2' style='display:inline; width:25px; background:linear-gradient(180deg, rgba(4,99,244,1) 11%, rgba(84,209,255,1) 41%, rgba(38,234,122,1) 52%, rgba(251,255,37,1) 65%, rgba(255,197,54,1) 74%, rgba(255,11,11,1) 100%);'></div>
            <div class='col pt-0 pb-0'>
              <div class='row'>
                <div style='display:inline;'>MIN</div>
              </div>
              <div class='row'>
                <div style='display:block; height:100px;'></div>
              </div>
              <div class='row'>
                <div style='display:inline;'>MAX</div>
              </div>
            </div>
          </div>
        </div>`;
        
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
    this.createInfoBox();
  },
};
</script>

<style scoped>
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
  width: 100%;
  max-height: 80%;
  position: relative;
}

.rounded-pill {
  position: relative;
}

.box {
  position: absolute;
  text-align: justify;
  top: 4rem;
  right: 4rem;
  z-index: 997;
  max-width: 20rem;
}

#accidentsMapContainer {
  box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.3);
  width: 100vw;
  height: 75vh;
}

#choice {
  position: absolute;
  font-size: 1.2em;
  top: 4.5rem;
  z-index: 997;
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
.selection {
  position: absolute;
  z-index: 997;
  max-width: 20rem;
  bottom: 43rem;
  right: 5rem
}

</style>
