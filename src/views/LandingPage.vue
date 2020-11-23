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

    <div class="jumbotron">
      <h1 class="display-4">City Data Visualizer</h1>
      <p class="lead pt-4">City Data Visualizer provides helpful visualizations for complex health data. With the help of open data, we hope to give both Berlin's administration and scientists a better understanding of current health risks or positive impacts that are occurring in the city.</p>
      <p class="text-center">See for yourself and explore open data right now by clicking the button.</p>
      <a class="btn btn-primary btn-lg" href="/berlin" role="button">Explore</a>
    </div>

    <hr>
    
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
      position: relative;
      bottom: 350px;
      width: 100%;
      color: white;
  }

  .col-md-12 {
    padding: 0;
  }

  .jumbotron {
    background-color: #FFF;
    position: relative;
    bottom: 200px;
  }

  .jumbotron>p {
    padding: 0 15% 0 15%;
    text-align: left;
  }

  .jumbotron>a {
    color: white;
  }

  .carousel-item .img-fluid {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
</style>
