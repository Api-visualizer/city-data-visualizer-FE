<template>
  <div>
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
          <img src="/images/berlin1.jpg" class="img-fluid" alt="Alexanderplatz" />
        </div>
        <div class="carousel-item">
          <img src="/images/berlin2.jpg" class="img-fluid" alt="Brandenburger Tor" />
        </div>
        <div class="carousel-item">
          <img src="/images/berlin3.jpg" class="img-fluid" alt="Brandenburger Tor" />
        </div>
      </div>
    </div>

    <div class="main-text hidden-xs">
      <div class="col-md-12 text-center">
        <img src="/images/logo_color_m.png" class="img-fluid" alt="Brandenburger Tor" />
      </div>
    </div>

    <div id="content">
      <div class="jumbotron">
        <h1 class="headline-4">City Data Visualizer</h1>
        <p class="lead pt-4" style="padding-bottom: 24px;">City Data Visualizer provides helpful visualizations for complex health data. With the help of open data, we hope to give both Berlin's administration, scientists and residents a better understanding of current health risks or positive impacts that are occurring in the city.</p>
        <p class="text-center"></p>

        <a href="#topics" class="text-dark">
          <svg href="#topics" width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-chevron-double-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </a>

    </div>

      <div class="jumbotron" id="topics">
        <div class="row">

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <img class="card-img-top" src="/images/cards/covid_cases.png" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">COVID-19</h5>
                <h6 class="card-subtitle mb-2 text-muted">Case Numbers per District</h6>
                <p class="card-text">This regional map lets you easily examine total and daily case numbers per district.</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary stretched-link" href="/infections" role="button">Explore</a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <img class="card-img-top" src="/images/cards/covid_age.png" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">COVID-19</h5>
                <h6 class="card-subtitle mb-2 text-muted">Case Numbers per Age Group</h6>
                <p class="card-text">Corresponding charts and tables allow you to get a deeper understanding of the development of the COVID-19 virus in Berlin.</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary stretched-link" href="/covid-age" role="button">Explore</a>
              </div>
            </div>
          </div>

        </div>

        <div class="row">

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <img class="card-img-top" src="/images/cards/covid_average.png" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">COVID-19</h5>
                <h6 class="card-subtitle mb-2 text-muted">Total Cases with Rolling Average</h6>
                <p class="card-text">Get a basic overview of the pandemic with this linechart - From the status quo all the way back to the beginning.</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary stretched-link" href="/covid-average" role="button">Explore</a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <img class="card-img-top" src="/images/cards/hospitals_status.png" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">Hospital Capacities</h5>
                <h6 class="card-subtitle mb-2 text-muted">Availability of Intensive Care Units</h6>
                <p class="card-text">This map shows Berlin's hospital locations and their capacity status during the COVID-19 pandemic. </p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary stretched-link" href="/hospitals" role="button">Explore</a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <img class="card-img-top" src="/images/cards/cancer_cases.png" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">Cancer </h5>
                <h6 class="card-subtitle mb-2 text-muted">Case Numbers per Age Group</h6>
                <p class="card-text">Our corresponding chart allows you to get a deeper understanding how the number of cancer patients per year, age and gender differentiates.</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary stretched-link" href="/cancer" role="button">Explore</a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <img class="card-img-top" src="/images/cards/traffic_accidents.png" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">Traffic Safety</h5>
                <h6 class="card-subtitle mb-2 text-muted">City-wide Accident Distribution</h6>
                <p class="card-text">This heat map gives you an overview of dangerous crossroads in Berlin. Filter by year, time of the accident and type - Stay safe!</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary stretched-link" href="/accidents" role="button">Explore</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="jumbotron">
        <h2 class="headline-4">FAQ</h2>
        <p class="lead pt-4" style="padding-bottom: 24px;">We have listed frequently asked questions under the FAQ section. If you cannot find an proper answer to your question, use the form below to propose your request. We kindly ask you to refer the FAQ beforehand.</p>
        <a class="btn btn-primary" href="/faq" role="button">Here</a>
      </div>

      <div class="jumbotron">
       <Contact />
      </div>

      <div class="jumbotron">
        <img src="/images/GitHub_Logo.png" alt="Github logo">
        <p class="lead pt-4" style="padding-bottom: 24px;">As City Data Visualizer is merely based on open source data, we want to share our source code with the open source community as well. If you would like to contribute to this project, you can do so in our repositories.</p>
        <!-- TODO: change link after renaming Github project -->
        <a class="btn btn-primary" href="https://github.com/Api-visualizer" role="button">Contribute</a>
      </div>

    </div>
  </div>
</template>

<script>
import Contact from "@/components/Contact";

export default {
  name: "Landing",

  props: {},

  components: {Contact},

  data() {
    return {
      open: true
    };
  },

  mounted() {},
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid{
  padding: 0;
}

.main-text{
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 250px;
  transform: translate(-50%, -50%);
}


.col-md-12 {
  padding: 0;
}

.jumbotron {
  margin: 0;
}

.jumbotron:nth-child(even) {

  background-color: white;
  background-image: url("data:image/svg+xml,%3Csvg width='504' height='288' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23477fcd' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E");

  background-repeat: repeat;
}

.jumbotron:nth-child(odd) {
  background-color: #FFF;
}

.jumbotron>p {
  padding: 0 20% 0 20%;
}

.row {
  padding: 0 20% 0 20%;
}

.card-footer{
  background-color: white;
}

.btn-primary {
  color: white;
}

.carousel-item .img-fluid {
  width: 100%;
  height: 500px;
  object-fit: cover;
}
ul.no-bullets {
  list-style-type: none;
}

svg {
  position: relative;
  animation-name: move;
  animation-duration: 2s;
  animation-delay: 3s;
  animation-iteration-count: infinite;
}

.headline-4 {
  font-weight: 300;
  font-size: 3.5rem;
  line-height: 1.2;
}

.card-img-top {
  width: 100%;
  height: 10vw;
  object-fit: cover;
}

.card {
  transition: transform .2s;
}

.card:hover {
  transform: scale(1.01);
}

@keyframes move {
  0%   {top: 0px;}
  50%  {top: 5px;}
  100% {top: 0px;}
}

.v-application ul{
  padding: 0;
}

</style>
