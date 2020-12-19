<template>
  <div>
     <div class="container-fluid border-bottom border-info" style="border-width: 5px !important;">
      <div class="row">
        <div class="col">
          <div class="title display-4 pl-5 pr-5 pt-2 pb-2 bg-light text-dark rounded-pill" style="opacity: 0.9">
            <span>Berlin</span>
            <br />
            <span><h4>Infections</h4></span>
          </div>
          <img src="/images/berlin4.jpg" class="w-100 headerimage" alt="Berlin" />
        </div>
      </div>
    </div>    
    <div id="container">
      <div id="mapContainer"></div>
    </div>
    <Timeslider v-if='sliderStartIndex' :id='this.busKey' :startIndex=this.sliderStartIndex :ticksLabels=this.ticksLabels :value=value />
    <div class="col m-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">COVID-19</h5>
          <h6 class="card-subtitle mb-2 text-muted">Case numbers per district</h6>
          <p class="card text p-2">This regional choropleth map is divided by Berlin’s large administrative districts, enabling you to see infection rates per 100 000 inhabitants for each separate area. As governmental policies hinge upon the regional incidence, this map is updated daily to support you in getting an idea of the risk of infection in your respective area, as well as in anticipating and understanding future regulations.
          <br><br>Infection ranges are color coded according to the key on the right, allowing you to get an idea of city-wide infection rates at just a glance. Additionally, you can choose which month to display in a drop down menu and pick specific dates in the time slider at the bottom, making it easy to examine the chronological development of COVID-19 infections in Berlin. Hovering over each district will give you exact numbers regarding cases, deaths, recoveries and incidence.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import GeneralClasses from "../../assets/GeneralClasses";
import Timeslider from "@/components/Timeslider";

export default {
  name: "CovidMap",

  components: { Timeslider },

  props: {
    busId: String
  },

  data() {
    return {
      dataResult: [],
      shapes: [],
      map: {},
      mapLayer: {},
      selectedDayNew: "",
      info: {},
      ticksLabels: [],
      value: '',
      sliderStartIndex: '',
      busKey: 'covid'
    };
  },

  methods: {
    fetchGeoShapes: function () {
      fetch(GeneralClasses.GETAPIberlinshapesdistrict())
        .then(response => response.json())
        .then(data => this.fetchCovidResultsAndFilter(data.data))
    },

    fetchCovidResultsAndFilter: function (shapes) {
      this.shapes = [];
      this.dataResult = [];
      fetch(GeneralClasses.GETAPIberlincoviddistrict())
        .then(response => response.json())
        .then(dat => {
          let data = dat.data
          data.forEach(d => this.dataResult.push(d));
          shapes.forEach(s => this.shapes.push(s));
          this.getDataOfSpecificDateToDisplay();
        })
    },

    getDataOfSpecificDateToDisplay: function () {
      let dataOfSpecificDay = [];
      dataOfSpecificDay = this.dataResult.filter((data) => data.doc.date === this.selectedDayNew);
      this.displayDataOfSpecificDate(dataOfSpecificDay, this.shapes);
    },

    displayDataOfSpecificDate: function(data, shapes) {
      this.mapLayer.clearLayers();
      data[0].doc.data.features.forEach((feature) => {
        let shape = shapes.filter(shape => shape.doc.district === feature.properties.GEN);
        feature.geometry = shape[0].doc.geometry;
      });

      this.mapLayer.addData(data[0].doc.data.features)
    },

    updateProps: function() {
      this.getDataOfSpecificDateToDisplay()
    },

    onEachFeature: function (feature, layer) {
      const polygon = L.polygon(feature.geometry.coordinates);
      const center = polygon.getBounds().getCenter();
      const map = this.map;
      layer.on({
        mouseover: (e) => {
          this.highlightFeature(e);
          this.info.update(layer.feature.properties);
        },
        mouseout: (e) => {
          this.resetHighlight(e);
          this.info.reset();
        },
        click: (e) => {
          this.zoomToFeature(e);
          map.setView([center.lng, center.lat], 12);
        }
      });
    },

    featureStyle: function (feature) {
      const cases_per = feature.properties.cases_per_100k;
      return {
        color: "white",
        opacity: "1",
        weight: "2",
        fillColor: this.getColor(cases_per),
        dashArray: '3',
        fillOpacity: 0.7,
      }
    },

    highlightFeature: function (e) {
      var layer = e.target;
      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      }
    },

    resetHighlight: function (e) {
      this.mapLayer.resetStyle(e.target);
    },

    zoomToFeature: function (e) {
      this.map.fitBounds(e.target.getBounds());
    },

    setupLeafletMap: function () {
      this.map = L.map("mapContainer", {
        center: [52.52, 13.405],
        zoom: 11,
        maxZoom: 12,
        minZoom: 10
      });

      let map = this.map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      this.mapLayer = L.geoJSON(false, {
        onEachFeature: this.onEachFeature,
        style: this.featureStyle,
      }).addTo(map);

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

        if (props.total_recovered && props.new_recovered != null) {
          this._div.innerHTML += `<p>Total recovered: ${props.total_recovered}, <mark>${props.new_recovered} new</mark>`
        }

        this._div.innerHTML += `<br><p><small>Last updated: ${props.last_update}</small></p>`
      };

      info.reset = function () {
        this._div.innerHTML = "<b>Hover over a district</b><br>" +
          "<b>to get data</b>";
      }

      let legend = this.customLegendControl();
      legend.addTo(map);
      info.addTo(map);
      this.info = info;
    },

    customLegendControl: function () {
      let legend = L.control({ position: 'topleft' });
      legend.onAdd = function () {

        this.getColor= function (d) {
          return d > 2000 ? '#b0091f' :
                d > 1800 ? '#ff0000' :
                d > 1600 ? '#e63030' :
                d > 1400? '#ff4800' :
                d > 1200 ? '#e3661e' :
                d > 1000 ? '#fc7e2a' :
                d > 800 ? '#ffc72e' :
                d > 600 ? '#f0de56' :
                d > 400 ? '#fff67d' :
                          '#9eff4a';
        }

        let div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
        let label = '<div class="mb-4"><strong>Cases per 100k</strong></div>'
        div.innerHTML += label

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML += "<div class='text-left mt-2 mb-2'><div class='text-left text-dark rounded p-1 mr-2' style='display:inline; opacity:0.7; background:" + this.getColor(grades[i] + 1) + "'>&nbsp;&nbsp;</div><div style='display:inline;'>" + grades[i] + (grades[i + 1] ? ' - ' + grades[i + 1] + '<br>' : '+') + "</div></div><hr class='p-0 m-0'>";
        }
        return div;
      };
      return legend;
    },

    getColor: function (d) {
      return d > 2000 ? '#b0091f' :
            d > 1800 ? '#ff0000' :
            d > 1600 ? '#e63030' :
            d > 1400 ? '#ff4800' :
            d > 1200 ? '#e3661e' :
            d > 1000 ? '#fc7e2a' :
            d > 800 ? '#ffc72e' :
            d > 600 ? '#f0de56' :
            d > 400 ? '#fff67d' :
                      '#9eff4a';
    },

    getDate: function () {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      today = dd + '.' + mm + '.' + yyyy;
      this.selectedDayNew = today;
    },

    getCovidData() {
      fetch(GeneralClasses.GETAPIberlincoviddistrict())
        .then(response => response.json())
        .then(dat => {
          let data = dat.data
          data.forEach((d) => this.ticksLabels.push(d.doc.date));
          this.ticksLabels.sort(function(a,b) {
            a = a.split('.').reverse().join('');
            b = b.split('.').reverse().join('');
            return a > b ? 1 : a < b ? -1 : 0;
          });
          //this.ticksLabels = this.ticksLabels.slice(this.ticksLabels.length-14);
          this.sliderStartIndex = this.ticksLabels.length-1
        })
    },

  },

  mounted() {
    this.setupLeafletMap();
    this.getDate();
    this.fetchGeoShapes();
    this.getCovidData();
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
#mapContainer {
  width: 100vw;
  height: 70vh;
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
