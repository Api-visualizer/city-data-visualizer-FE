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
        <h1 class="display-4">City Data Visualizer</h1>
        <p class="lead pt-4" style="padding-bottom: 24px;">City Data Visualizer provides helpful visualizations for complex health data. With the help of open data, we hope to give both Berlin's administration, scientists and residents a better understanding of current health risks or positive impacts that are occurring in the city.</p>
        <p class="text-center"></p>
        <p><a href="/berlin"><ul>FAQ</ul></a></p>
      </div>

      <div class="jumbotron">
        <div class="row">

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Covid-19</h5>
                <h6 class="card-subtitle mb-2 text-muted">Charts/Graphs</h6>
                <p class="card-text">Various charts and graphs allow you to get a deep understanding on the development of the COVID-19 virus.</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary" href="/berlin/charts" role="button">Here</a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Covid-19</h5>
                <h6 class="card-subtitle mb-2 text-muted">Heatmap</h6>
                <p class="card-text">The Heatmap can give you a quick overview of the actual numbers of infections per district.</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary" href="/berlin/karte/corona" role="button">Here</a>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Accidents</h5>
                <h6 class="card-subtitle mb-2 text-muted">Heatmap</h6>
                <p class="card-text">The Heatmap gives you an overview of dangerous crossroads in Berlin. Stay safe!</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary" href="/berlin/karte/accidents" role="button">Here</a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Hospitals</h5>
                <h6 class="card-subtitle mb-2 text-muted">Map</h6>
                <p class="card-text">The map shows hospitals and their capacities during covid19</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary" href="/berlin/karte/hospitals" role="button">Here</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="jumbotron">
        <h1 class="display-4">Lorem Ipsum</h1>
        <p class="lead pt-4" style="padding-bottom: 24px;">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren</p>
        <p class="text-center"></p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  props: {
    msg: String,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
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

.main-text{
  #position: relative;
  #bottom: 350px;
  #width: 100%;
  #color: white;
}

.col-md-12 {
  padding: 0;
}

.jumbotron {
  margin: 0;
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

.card>p {
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
</style>
