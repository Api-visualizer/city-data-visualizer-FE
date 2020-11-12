<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import GeneralClasses from "../../../assets/GeneralClasses";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import moment from "moment";

export default {
  name: "KarteCorona",

  props: {
    msg: String,
  },

  data() {
    return {
      map: {},
      min_cases_per: 100000,
      max_cases_per: 0,
    };
  },

  methods: {
    fetchGeoShapes: function () {
      this.$http
        .get(GeneralClasses.GETAPIberlinshapesdistrict())
        .then((res) => this.APIResult(res.data));
    },

    APIResult: function (shapes) {
      this.$http
        .get(GeneralClasses.GETAPIberlincoviddistrict())
        .then((res) =>
          res.data.filter((data) => data.date === this.todaysDate())
        )
        .then((data) => {
          data = data[0].data; // TODO rename
          data.features.forEach((feature) => {
            const shape = shapes.filter(
              (shape) => shape.district === feature.properties.GEN
						)[0];						
            feature.geometry = shape.geometry;
            if (feature.properties.cases_per_100k < this.min_cases_per)
              this.min_cases_per = feature.properties.cases_per_100k;
            if (feature.properties.cases_per_100k > this.max_cases_per)
              this.max_cases_per = feature.properties.cases_per_100k;
					});
					
          L.geoJSON(data, {
            onEachFeature: this.onEachFeature,
            style: this.featureStyle,
          }).addTo(this.map);
        });
    },

    onEachFeature: function (feature, layer) {
      const polygon = L.polygon(feature.geometry.coordinates);
      const center = polygon.getBounds().getCenter();
      console.log(center)
      const map = this.map;

      layer.on("click", function () {
        const popupInfo =
          "<b>" +
          feature.properties.GEN +
          "</b>" +
          "<p>Total cases: " +
          feature.properties.cases +
          "</p>" +
          "<p>Cases per 100k: " +
          Math.round(feature.properties.cases_per_100k) +
          "</p>" +
          "<p>Total deaths: " +
          feature.properties.deaths +
          "</p>";
        layer.bindPopup(popupInfo);
        //map.panTo([center.lng, center.lat]);
        map.setView([center.lng, center.lat],12)
      });
    },

    featureStyle: function (feature) {
      const cases_per = feature.properties.cases_per_100k;
      const scale = this.scale(cases_per, this.min_cases_per, this.max_cases_per, 0.2, 1.0);
			
      return {
        color: "white",
        opacity: "1",
        weight: "1",
        fillColor: "red",
        fillOpacity: scale,
      }
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
      }).addTo(this.map)
    },

    todaysDate: function () {
      return moment().format("DD.MM.YYYY")
    },

    scale: function (num, in_min, in_max, out_min, out_max) {
      return (
        ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    },
  },

  mounted() {
    this.setupLeafletMap();
    this.fetchGeoShapes();
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>
