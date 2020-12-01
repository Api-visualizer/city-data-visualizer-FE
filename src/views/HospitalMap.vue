<template>
  <div>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
    <Timeslider v-if='sliderStartIndex' :startIndex=this.sliderStartIndex :ticksLabels=this.ticksLabels :value=value />
  </div>
</template>

<script>
import GeneralClasses from "../assets/GeneralClasses";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Timeslider from "@/components/Timeslider";

export default {
  name: "BerlinMapCovid",
  components: {Timeslider},
  data() {
    return {
      dataResult: [],
      value: '',
      map: {},
      mapLayer: {},
      selectedDayNew: "",
      info: {},
      shapes: [],
      sliderStartIndex: '',
      ticksLabels: []
    };
  },

  computed: {
    redIcon() {
      return L.icon({
        iconUrl: 'https://b.kisscc0.com/20180705/qoq/kisscc0-google-maps-pin-google-map-maker-computer-icons-map-pin-2-5b3dc69162bb64.0320443815307751854044.png',
        iconSize:     [30, 44], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
    },
    greenIcon () {
      return L.icon({
        iconUrl: 'https://apprecs.org/gp/images/app-icons/300/8c/com.exlyo.mapmarker.jpg',
        iconSize:     [60, 60], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
    },
    orangeIcon () {
      return L.icon({
        iconUrl:      'https://www.clker.com/cliparts/L/p/r/a/y/C/google-maps-marker-for-residencelamontagne.svg.hi.png',
        iconSize:     [33, 45], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
    },
    defaultIcon () {
      return L.icon({
        iconUrl: 'https://www.pngkey.com/png/full/48-480344_maps-clipart-map-pin-grey-google-maps-marker.png',
        iconSize:     [30, 43], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
    }
  },

  methods: {
    fetchGeoShapes: function () {
      fetch(GeneralClasses.GETAPIberlinshapesdistrict())
          .then(response => response.json())
          .then((data) => {
            let districts = data[0]
            for (let district of districts) {
              L.geoJSON(district.geometry).addTo(this.map)
            }
            this.fetchHospitalResults(data)
          })
    },
    fetchHospitalResults: function () {
      this.dataResult = [];
      fetch(GeneralClasses.GETAPIberlinHospitals())
          .then(response => response.json())
          .then(data => {
            data[0].forEach(d => this.dataResult.push(d));
            this.getDataOfSpecificDateToDisplay();
          })
    },

    getDataOfSpecificDateToDisplay: function () {
      let dataOfSpecificDay = [];
      dataOfSpecificDay = this.dataResult.filter((data) => data.date === this.selectedDayNew);
      console.log(dataOfSpecificDay)
      this.displayDataOfSpecificDate(dataOfSpecificDay);
    },

    displayDataOfSpecificDate: function(dataOfSpecificDay) {
      this.mapLayer.clearLayers();
      let hospitals = dataOfSpecificDay[0].features
      let counter = 0
      for(let hospital of hospitals) {
        let coordinates = hospital.geometry.coordinates
        if(hospital.properties.status.statusHighCare === 'VERFUEGBAR') {
          counter = counter + 1
          this.mapLayer.addLayer(L.marker([coordinates[1], coordinates[0]],{icon: this.greenIcon}).bindPopup('<div><br><b>'+ hospital.properties.name +'</b></div><br>' +
                  'last update: ' + hospital.properties.last_update))
        } else if (hospital.properties.status.statusHighCare === 'KEINE_ANGABE' ){
          counter = counter + 1
          this.mapLayer.addLayer(L.marker([coordinates[1], coordinates[0]],{icon: this.defaultIcon}).bindPopup('<div><br><b>'+ hospital.properties.name +'</b></div><br>' +
                  'last update: ' + hospital.properties.last_update))
        } else if (hospital.properties.status.statusHighCare === 'BEGRENZT' ){
          counter = counter + 1
          this.mapLayer.addLayer(L.marker([coordinates[1], coordinates[0]],{icon: this.orangeIcon}).bindPopup('<div><br><b>'+ hospital.properties.name +'</b></div><br>' +
                  'last update: ' + hospital.properties.last_update))
        } else if (hospital.properties.status.statusHighCare === 'NICHT_VERFUEGBAR' ){
          counter = counter + 1
          this.mapLayer.addLayer(L.marker([coordinates[1], coordinates[0]],{icon: this.redIcon}).addTo(this.map)
              .bindPopup('<div><br><b>'+ hospital.properties.name +'</b></div><br>' +
                  'last update: ' + hospital.properties.last_update))
        }
        this.mapLayer.addTo(this.map)
      }
      console.log()
      console.log('hospitals found: ' + counter)
      console.log(hospitals.length)

    },

    updateProps: function() {
      this.getDataOfSpecificDateToDisplay()
    },

    getDate: function () {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      today = dd + '.' + mm + '.' + yyyy;
      this.selectedDayNew = today;
    },

    setupLeafletMap: function () {
      this.map = L.map("mapContainer", {
        center: [52.52, 13.405],
        zoom: 11,
        maxZoom: 13,
        minZoom: 11
      });

      let map = this.map;

      L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

      let legend = this.customLegendControl();
      legend.addTo(map);

      this.mapLayer = L.layerGroup();
      this.map.addLayer(this.mapLayer)
    },

    customLegendControl: function () {
      let legend = L.control({ position: 'topleft' });
      legend.onAdd = function () {

      let colors = ['#008000', '#ffa500', '#FF0000', '#808080']

        let div = L.DomUtil.create('div', 'info legend'),
            grades = ['capacities',  'Limited','no capacities', 'Not specified'];
        let label = '<div class="mb-4"><strong>Capacities</strong></div>'
        div.innerHTML += label

        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<h6 class="text-left">' +
              '<i class ="info" style="background:' + colors[i] +'">' + '</i>' + grades[i] + "</h6><hr/>";
        }
        return div;
      };
      return legend;
    },
    getCovidData() {
      fetch(GeneralClasses.GETAPIberlinHospitals())
          .then(response => response.json())
          .then(data => {
            data[0].forEach((d) => this.ticksLabels.push(d.date));
            this.ticksLabels.sort(function(a,b) {
              a = a.split('.').reverse().join('');
              b = b.split('.').reverse().join('');
              return a > b ? 1 : a < b ? -1 : 0;
            });
            this.ticksLabels = this.ticksLabels.slice(this.ticksLabels.length-14);
            this.sliderStartIndex = this.ticksLabels.length-1
          })
    },
  },
  mounted() {
    this.setupLeafletMap();
    this.getDate();
    this.fetchGeoShapes();
    this.getCovidData();
    this.bus.$on('new-date', (newDate) => {
      this.selectedDayNew = newDate
      this.updateProps();
    })
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 65vh;
}

.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border-radius: 5px;
}
.info h4 {
  margin: 0 0 5px;
  color: #777;
}

.legend {
  line-height: 18px;
  color: #555;
}
.legend i {
  width: 18px;
  height: 18px;
  float: left;
  opacity: 0.7;
}
.CasesContainer
{
  text-align: left;
}
</style>
