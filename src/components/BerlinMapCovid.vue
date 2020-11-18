<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import GeneralClasses from "../assets/GeneralClasses";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import moment from "moment";

export default {
  name: "BerlinMapCovid",

  props: {
    selectedDay: {
      default: "29.10.2020",
      type: String
    }
  },

  data() {
    return {
      dataResult: [],
      shapes: [],
      map: {},
      mapLayer: {},
      min_cases_per: 100000,
      max_cases_per: 0,
      SelectedDayNew: "29.10.2020",
      info: {},
    };
  },

  methods: {
    fetchGeoShapes: function () {
      this.$http
        .get(GeneralClasses.GETAPIberlinshapesdistrict())
        .then((res) => {
        this.fetchCovidResultsAndFilter(res.data)
        });
    },

    fetchCovidResultsAndFilter: function (shapes) {
      this.shapes = [];
      this.dataResult = [];
      this.$http
        .get(GeneralClasses.GETAPIberlincoviddistrict())
        .then((data) => {
          data.data.forEach(d => {
            this.dataResult.push(d);
          });
          shapes.forEach(s => {
            this.shapes.push(s);
          })
          this.getDataOfSpecificDateToDisplay()
        });
    },

    getDataOfSpecificDateToDisplay: function () {
      let dataOfSpecificDay = [];
      dataOfSpecificDay = this.dataResult.filter((data) => data.date === this.SelectedDayNew);
      this.displayDataOfSpecificDate(dataOfSpecificDay, this.shapes);
    },

    displayDataOfSpecificDate: function(data, shapes) {
      this.mapLayer.clearLayers();

      data[0].data.features.forEach((feature) => {
        const shape = shapes.filter(
          (shape) => shape.district === feature.properties.GEN)[0];						
        feature.geometry = shape.geometry;

        this.min_cases_per = Math.min(this.min_cases_per, feature.properties.cases_per_100k);
        this.max_cases_per = Math.max(this.max_cases_per, feature.properties.cases_per_100k);        
      });
      
      this.mapLayer.addData(data[0].data)
    },

    updateProps: function() {
      this.min_cases_per = 100000,
      this.max_cases_per = 0,
      this.getDataOfSpecificDateToDisplay()
    },

    onEachFeature: function (feature, layer) {
      const polygon = L.polygon(feature.geometry.coordinates);
      const center = polygon.getBounds().getCenter();
      const map = this.map;

      layer.on({
        mouseover: () => {
          this.info.update(layer.feature.properties);          
        },
        mouseout: () => {
          this.info.reset();
        },
        click: () => map.setView([center.lng, center.lat], 12)        
      });
    },

    featureStyle: function (feature) {
      const cases_per = feature.properties.cases_per_100k;
      const scale = this.scale(cases_per, this.min_cases_per, this.max_cases_per, 0.2, 0.9);

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

      let map = this.map;

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.mapLayer = L.geoJSON(false, {
        onEachFeature: this.onEachFeature,
        style: this.featureStyle,
      }).addTo(this.map);

      let info = L.control();
      info.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.reset();
        return this._div;
      }
      
      info.update = function (props) {        
        this._div.innerHTML = `<p><b>${props.GEN}</b></p>` +
          `<p>Total cases: ${props.cases}</p>` +
          `<p>Total deaths: ${props.deaths}</p>` +  
          `<p>Cases per 100k: ${Math.round(props.cases_per_100k)}</p>`         
      };

      info.reset = function () {
        this._div.innerHTML = "<b>Hover over a district</b><br>" +
          "<b>to get data</b>";
      }

      info.addTo(map);      
      this.info = info;
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
    this.bus.$on('new-date', (newDate) => {
      this.SelectedDayNew = newDate;
      this.updateProps();
    })
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>
