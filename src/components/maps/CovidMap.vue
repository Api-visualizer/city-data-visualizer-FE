<template>
  <div>
    <div id="container">
      <div id="mapContainer"></div>
    </div>
    <Timeslider class="tslider" v-if='sliderStartIndex' :id='this.busKey' :startIndex=this.sliderStartIndex :ticksLabels=this.ticksLabels :value=value />
    <Textbox class="textbox" :content="content" title="COVID-19" subtitle="Case numbers per district" />
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import GeneralClasses from "../../assets/GeneralClasses";
import Timeslider from "@/components/Timeslider";
import Textbox from "@/components/Textbox";

export default {
  name: "CovidMap",

  components: { Timeslider, Textbox },

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
      inf: {},
      ticksLabels: [],
      value: '',
      sliderStartIndex: '',
      busKey: 'covid',
      content: "This regional choropleth map is divided by Berlin’s large administrative districts, enabling you to see" +
          " infection rates per 100 000 inhabitants for each separate area. As governmental policies hinge upon the" +
          " regional incidence, this map is updated daily to support you in getting an idea of the risk of infection" +
          " in your respective area. <br><br>"+
          "Infection ranges are color coded according to the key on the right. Hovering over each district will give you " +
          "exact numbers regarding cases, deaths, recoveries and incidence."
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
          this.inf.update(layer.feature.properties);
        },
        mouseout: (e) => {
          this.resetHighlight(e);
          this.inf.reset();
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

    async setupLeafletMap () {
      this.map = L.map("mapContainer", {
        // zoomControl: false,
        center: [52.52, 13.405],
        zoom: 11,
        maxZoom: 12,
        minZoom: 10
      });

      let map = this.map;
      map.removeControl(map.zoomControl);
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      this.mapLayer = L.geoJSON(false, {
        onEachFeature: this.onEachFeature,
        style: this.featureStyle,
      }).addTo(map);

      let inf = L.control({ position: "bottomleft" });
      inf.onAdd = function () {
        this._div = L.DomUtil.create('div', 'inf'); // create a div with a class "inf"
        this.reset();
        return this._div;
      }

      inf.update = function (props) {
        this._div.innerHTML = `<p><b>${props.GEN}</b></p>` +
          `<p>Total cases: ${props.cases}</p>` +
          `<p>Total deaths: ${props.deaths}</p>` +
          `<p>Cases per 100k: ${Math.round(props.cases_per_100k)}</p>`

        if (props.total_recovered && props.new_recovered != null) {
          this._div.innerHTML += `<p>Total recovered: ${props.total_recovered}, <mark>${props.new_recovered} new</mark>`
        }

        this._div.innerHTML += `<br><p><small>Last updated: ${props.last_update}</small></p>`
      };

      inf.reset = function () {
        this._div.innerHTML = "<b>Hover over a district</b><br>" +
          "<b>to get data</b>";
      }

      let legend = this.customLegendControl();
      legend.addTo(map);
      inf.addTo(map);
      this.inf = inf;
    },
    getColor: function (d) {
      let grades = JSON.parse(localStorage.getItem('grades'))
      return d > parseInt(grades[9]) ? '#b0091f' :
          d > parseInt(grades[8]) ? '#ff0000' :
          d > parseInt(grades[7]) ? '#e63030' :
          d > parseInt(grades[6]) ? '#ff4800' :
          d > parseInt(grades[5]) ? '#e3661e' :
          d > parseInt(grades[4]) ? '#fc7e2a' :
          d > parseInt(grades[3]) ? '#ffc72e' :
          d > parseInt(grades[2]) ? '#f0de56' :
          d > parseInt(grades[1]) ? '#fff67d' :
          '#9eff4a';
    },

    customLegendControl: function () {
      let legend = L.control({ position: 'topleft' });
      legend.onAdd = function () {
        let legendinfo = JSON.parse(localStorage.getItem('legendinfo'))

        this.getColor= function (d) {
          let grades = JSON.parse(localStorage.getItem('grades'))

          return d > parseInt(grades[9]) ? '#b0091f' :
              d > parseInt(grades[8]) ? '#ff0000' :
              d > parseInt(grades[7]) ? '#e63030' :
              d > parseInt(grades[6]) ? '#ff4800' :
              d > parseInt(grades[5]) ? '#e3661e' :
              d > parseInt(grades[4]) ? '#fc7e2a' :
              d > parseInt(grades[3]) ? '#ffc72e' :
              d > parseInt(grades[2]) ? '#f0de56' :
              d > parseInt(grades[1]) ? '#fff67d' :
              '#9eff4a';
        }

        let div = L.DomUtil.create('div', 'inf legend white')

        let grades = [0]

        legendinfo.forEach((d) => grades.push(parseInt(Object.keys(d)[0])))
        localStorage.setItem('grades', JSON.stringify(grades))
        let label = '<div class="mb-4"><strong>Cases per 100k</strong></div>'
        div.innerHTML += label

        for (var i = 0; i < grades.length-1; i++) {
          div.innerHTML +=
              "<div class='text-left mt-2 mb-2'>" +
                "<div class='text-left text-dark rounded p-1 mr-2' style='display:inline; opacity:0.7; " +
                      "background:" + this.getColor(parseInt(grades[i]) + 1) + "'>&nbsp;&nbsp;" +
                "</div>" +
                "<div style='display:inline;'>"
              + parseInt(grades[i]+1) + (parseInt(grades[i + 2]) ? ' - ' + parseInt(grades[i + 1]) + '<br>' : '+') +
              "</div>" +
              "</div>" +
              "<hr class='p-0 m-0'>";
        }
        return div;
      };
      return legend;
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
    async getLegendInfo() {
      await fetch('https://cdv-backend.api.datexis.com/api/v1/covid-legend')
          .then((response) => response.json())
          .then((data) => {
            let dat = data.legend
            localStorage.setItem('legendinfo', JSON.stringify(dat))
          });
    }
  },

  async mounted() {
    await this.getLegendInfo()
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
  height: 83vh;
}

/deep/.leaflet-right {
  margin-right: 16px;
}

/deep/.inf {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}

/deep/.inf h4 {
    margin: 0 0 5px;
    color: #777;
}

.textbox {
  position: absolute;
  right: 0.7vw;
  top: 11vh;
  z-index: 9996;
  width: 20rem;
}

.legend i {
    width: 18px;
    height: 18px;
    float: left;
    opacity: 0.7;
}

.tslider {
  position: absolute;
  transform: translate(5%, -160%);
  z-index: 999;
  margin: 1rem 5rem 0rem 10rem;
}

</style>
