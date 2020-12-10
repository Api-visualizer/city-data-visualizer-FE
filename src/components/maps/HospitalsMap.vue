<template>
  <div>
    <div class="container-fluid border-bottom border-info" style="border-width: 5px !important;">
      <div class="row">
        <div class="col">
          <div class="title display-4 pl-5 pr-5 pt-2 pb-2 bg-light text-dark rounded-pill" style="opacity: 0.9">
            <span>Berlin</span>
            <br />
            <span><h4>Hospitals</h4></span>
          </div>
          <img src="/images/berlin4.jpg" class="w-100 headerimage" alt="Berlin" />
        </div>
      </div>
    </div>    
    <div id="container">
      <div id="hospitalMapContainer"></div>
    </div>
    <Timeslider v-if='sliderStartIndex' :id='this.busKey' :startIndex=this.sliderStartIndex :ticksLabels=this.ticksLabels :value=value />
    <div class="col m-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">COVID-19</h5>
          <h6 class="card-subtitle mb-2 text-muted">Hospital Capacities</h6>
          <p class="card text p-2">
            This map displays all hospitals in Berlin as location markers on a map divided by administrative districts. Adhering to the key on the left side, each hospital is color coded to reflect its current capacity on a daily basis. As with the COVID-19 infection map, the time slider at the bottom allows you to choose which months and days to display.
            <br><br>As COVID-19 cases are rising and hospitals are beginning to reach the limits of their capacity, this is a valuable resource to assess our position in the current pandemic and to understand the basis of policy changes.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralClasses from "../../assets/GeneralClasses";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Timeslider from "@/components/Timeslider";

export default {
  name: "HospitalsMap",

  components: { Timeslider },

  props: {
    busId: String
  },

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
      ticksLabels: [],
      busKey: 'hospitals'
    };
  },

  computed: {
    redIcon() {
      return L.icon({
        iconUrl: '/images/PIN-Red.png',
        iconSize:     [30, 50], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
    },
    greenIcon () {
      return L.icon({
        iconUrl: '/images/PIN-Green.png',
        iconSize:     [30, 50], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
    },
    orangeIcon () {
      return L.icon({
        iconUrl: '/images/PIN-Orange.png',
        iconSize:     [30, 50], // size of the icon
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
          let districts = data[0];
          for (let district of districts) L.geoJSON(district.geometry).addTo(this.map);
          this.fetchHospitalResults(data);
        })
    },

    fetchHospitalResults: function () {
      this.dataResult = [];
      fetch(GeneralClasses.GETAPIberlinHospitals())
        .then(response => response.json())
        .then(data => {
          data[0].forEach(d => this.dataResult.push(d));
          this.getDataOfSpecificDateToDisplay();
          this.setSliderTicks(data);
        })
    },

    getDataOfSpecificDateToDisplay: function () {
      let dataOfSpecificDay = [];
      dataOfSpecificDay = this.dataResult.filter((data) => data.date === this.selectedDayNew);
      this.displayDataOfSpecificDate(dataOfSpecificDay);
    },

    displayDataOfSpecificDate: function(dataOfSpecificDay) {
      this.mapLayer.clearLayers();
      let hospitals = dataOfSpecificDay[0].features
      for(let hospital of hospitals) {
        let coordinates = hospital.geometry.coordinates
        if(hospital.properties.status.statusHighCare === 'VERFUEGBAR') {
          this.mapLayer.addLayer(L.marker([coordinates[1], coordinates[0]],{icon: this.greenIcon}).bindPopup('<div><br><b>'+ hospital.properties.name +'</b></div><br>' +
                  'last update: ' + hospital.properties.last_update))
        } else if (hospital.properties.status.statusHighCare === 'KEINE_ANGABE' ){
          this.mapLayer.addLayer(L.marker([coordinates[1], coordinates[0]],{icon: this.defaultIcon}).bindPopup('<div><br><b>'+ hospital.properties.name +'</b></div><br>' +
                  'last update: ' + hospital.properties.last_update))
        } else if (hospital.properties.status.statusHighCare === 'BEGRENZT' ){
          this.mapLayer.addLayer(L.marker([coordinates[1], coordinates[0]],{icon: this.orangeIcon}).bindPopup('<div><br><b>'+ hospital.properties.name +'</b></div><br>' +
                  'last update: ' + hospital.properties.last_update))
        } else if (hospital.properties.status.statusHighCare === 'NICHT_VERFUEGBAR' ){
          this.mapLayer.addLayer(L.marker([coordinates[1], coordinates[0]],{icon: this.redIcon}).addTo(this.map)
              .bindPopup('<div><br><b>'+ hospital.properties.name +'</b></div><br>' +
                  'last update: ' + hospital.properties.last_update))
        }
        this.mapLayer.addTo(this.map)
      }
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
      this.map = L.map("hospitalMapContainer", {
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
        let colors = ['#4fbe53', '#ff8146', '#ff4649', '#a2a2a2']

        let div = L.DomUtil.create('div', 'info legend'),
            grades = ['Capacities',  'Limited','No capacities', 'Not specified'];
        let label = '<div class="mb-4"><strong>Capacities</strong></div>'                
        div.innerHTML += label

        for (let i = 0; i < grades.length; i++) {
          div.innerHTML += "<div class='text-left mt-2 mb-2'><div class='text-left text-dark rounded p-1 mr-2' style='display:inline; opacity:0.7; background:" + colors[i] + "'>&nbsp;&nbsp;</div><div style='display:inline;'>" + grades[i] + "</div></div><hr class='p-0 m-0'>";                      
        }
        return div;
      };
      return legend;
    },

    setSliderTicks: function (data) {
      console.log(data)
      data[0].forEach((d) => this.ticksLabels.push(d.date));

      this.ticksLabels.sort(function(a,b) {
        a = a.split('.').reverse().join('');
        b = b.split('.').reverse().join('');
        return a > b ? 1 : a < b ? -1 : 0;
      });
      this.sliderStartIndex = this.ticksLabels.length-1
    },
  },

  mounted() {
    this.setupLeafletMap();
    this.getDate();
    this.fetchGeoShapes();
    if (this.$props.busId != undefined) this.busKey = this.$props.busId;
    this.bus.$on(this.busKey, (newDate) => {
      this.selectedDayNew = newDate
      this.updateProps();
    })
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
#hospitalMapContainer {
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
</style>
