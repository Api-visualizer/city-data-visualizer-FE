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
      selectedDayNew: "29.10.2020",
      info: {},
    };
  },

  methods: {
    fetchGeoShapes: function () {
      fetch(GeneralClasses.GETAPIberlinshapesdistrict())
        .then(response => response.json())
        .then(data => this.fetchCovidResultsAndFilter(data))
    },

    fetchCovidResultsAndFilter: function (shapes) {
      this.shapes = [];
      this.dataResult = [];
      fetch(GeneralClasses.GETAPIberlincoviddistrict())
        .then(response => response.json())
        .then(data => {
          data.forEach(d => {
            this.dataResult.push(d);
          });
          shapes.forEach(s => {
            this.shapes.push(s);
          })
          this.getDataOfSpecificDateToDisplay()
        })          
    },

    getDataOfSpecificDateToDisplay: function () {
      let dataOfSpecificDay = [];      
      dataOfSpecificDay = this.dataResult[0].filter((data) => data.date === this.selectedDayNew);          
      this.displayDataOfSpecificDate(dataOfSpecificDay, this.shapes[0]);
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
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.zoomToFeature
      })
      layer.on({
        mouseover: () => {
          this.info.update(layer.feature.properties);          
        },
        mouseout: () => {
          this.resetHighlight;
          this.info.reset();
        },
        click: () => {
            this.zoomToFeature;
            map.setView([center.lng, center.lat], 12);
           }        
      });
    },

    featureStyle: function (feature) {
      // const cases_per = feature.properties.cases_per_100k;
      // const scale = this.scale(cases_per, this.min_cases_per, this.max_cases_per, 0.2, 0.9);  Ist Scale WICHTIG ?
      return {
        color: "white",
        opacity: "1",
        weight: "2",
        fillColor: this.getColor(feature.properties.cases_per_100k),
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

        if (props.total_recovered && props.new_recovered != null) {
          this._div.innerHTML += `<p>Total recovered: ${props.total_recovered}, <mark>${props.new_recovered} new</mark>`
        }                
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
        let label = '<div><br><strong> Cases per 100k </strong><br><br></div>'

        div.innerHTML += label

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML += '<i class ="info" style="background:' + 
                            this.getColor(grades[i] + 1) + '"></i> ' +
                            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        div.innerHTML += '<div><br><br></div>'
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
      this.selectedDayNew = newDate;      
      this.updateProps();
    })
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

</style>
