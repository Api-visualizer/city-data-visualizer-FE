<template>
  <div>
    <h1>{{ msg }}</h1>
    <div id="demo" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul>

      <!-- The slideshow -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/images/berlin.jpg" class="img-fluid" alt="Los Angeles" />
        </div>
        <div class="carousel-item">
          <img src="/images/hamburg.jpg" class="img-fluid" alt="Chicago" />
        </div>
        <div class="carousel-item">
          <img src="/images/munich.jpg" class="img-fluid" alt="New York" />
        </div>
      </div>

      <!-- Left and right controls -->
      <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>
    <hr />
    <div style="padding: 50px">    
    <vue-good-table
      :columns="columns"
      :rows="Markers"
      :pagination-options="{
        enabled: true,
        perPage: 12,
        perPageDropdown: [12, 24],
      }"
    />
    </div>
    <hr />
    <div style="padding: 50px">
      <l-map style="height: 500px" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          v-for="(item, index) in Markers"
          :key="'marker-' + index"
          :lat-lng="[item.lat, item.long]"
          :icon="icon"
        />
      </l-map>
      <hr />
      <select class="TextField F100" v-model="Type">
        <option value="area" selected>Area Chart</option>
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
      <hr />
      <center>
        <apexchart
          width="100%"
          :type="Type"
          height="400px"
          :options="chartOptions"
          :series="series"
        ></apexchart>
        <hr />
      </center>
    </div>
  </div>
</template>

<script>
import GeneralClasses from "../../../assets/GeneralClasses";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      icon: icon({
        iconUrl: "/images/marker-icon.png",
      }),
      Type: "area",
      chartOptions: {},
      series: [],

      chartOptions2: {},
      series2: [],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 11,
      Markers: [],
      center: [0, 0],
      columns: [
        {
          label: "ID",
          field: "id",
          type: "number",
          width: "50px",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Adresse",
          field: "adresse",
        },
        {
          label: "Plz",
          field: "plz",
          type: "number",
          width: "125px",
        },
        {
          label: "Bezirk",
          field: "bezirk",
        },
        {
          label: "Lat",
          field: "lat",
          sortable: false,
        },
        {
          label: "Long",
          field: "long",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    GetUnique: function (arr, comp) {
      const unique = arr
        .map((e) => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e])
        .map((e) => arr[e]);
      return unique;
    },
    CountValues: function (arr) {
      return arr.reduce(
        (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
        {}
      );
    },
    APIResult: function () {
      this.$http.get(GeneralClasses.GETAPIberlinverschenken()).then((Result) => {
        this.Markers = Result.data[0].index;

        var CitiesCollection = [];
        for (let i = 0; i < this.Markers.length; i++) {
          CitiesCollection[i] = this.Markers[i].bezirk;
        }

        console.log();
        var UniqueCollection = this.GetUnique(this.Markers, "bezirk");

        this.center = [52.5373, 13.3603];
        var Collection = [];
        var Data = [];
        for (let i = 0; i < UniqueCollection.length; i++) {
          Collection[i] = UniqueCollection[i].bezirk;
          Data[i] = this.CountValues(CitiesCollection)[
            UniqueCollection[i].bezirk
          ];
        }
        // console.log(Collection);
        // console.log(Data);

        this.chartOptions = {
          chart: { id: "vuechart-example" },
          xaxis: {
            categories: Collection,
          },
        };
        this.series = [
          {
            name: "series-1",
            data: Data,
          },
        ];
      });
    },
  },
  mounted() {
    this.APIResult();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
