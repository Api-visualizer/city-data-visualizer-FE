<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import GeneralClasses from "../assets/GeneralClasses";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "BerlinMapCovid",

  data() {
    return {
      dataResult: [],
      map: {},
      mapLayer: {},
      selectedDayNew: "",
      info: {},
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
    defaultIcon () {
      return L.icon({
        iconUrl: 'https://www.pngkey.com/png/full/48-480344_maps-clipart-map-pin-grey-google-maps-marker.png',
        iconSize:     [34, 45], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
    }
  },

  methods: {
    fetchGeoShapes: function () {
      fetch(GeneralClasses.GETAPIberlinshapesdistrict())
          .then(response => response.json())
          .then((data) =>{
            let districts = data[0]
            for(let district of districts) {
              console.log(district)
              L.geoJSON(district.geometry).addTo(this.map)
            }
          })
    },

    fetchData: function () {
      this.$http.get(GeneralClasses.GETAPIberlinHospitals()).then((response) => {
        let hospitals = response.data[0].features
        for(let hospital of hospitals) {
          let coordinates = hospital.geometry.coordinates
          if(hospital.properties.status.statusHighCare === 'VERFUEGBAR') {
            L.marker([coordinates[1], coordinates[0]],{icon: this.greenIcon}).addTo(this.map);
          } else if (hospital.properties.status.statusHighCare === 'KEINE_ANGABE' ){
            L.marker([coordinates[1], coordinates[0]],{icon: this.defaultIcon}).addTo(this.map);
          } else if (hospital.properties.status.statusHighCare === 'BEGRENZT' ){
            L.marker([coordinates[1], coordinates[0]],{icon: this.redIcon}).addTo(this.map);
          }
        }
      })},

    zoomToFeature: function (e) {
      this.map.fitBounds(e.target.getBounds());
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
    }
  },
  mounted() {
    this.setupLeafletMap();
    this.fetchGeoShapes();
    this.fetchData();
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 80vh;
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
