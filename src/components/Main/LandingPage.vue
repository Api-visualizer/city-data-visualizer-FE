<template>
  <div class="p-5">
    <div id="demo" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul>

      <!-- The slideshow -->
      <div class="carousel-inner rounded-pill">
        <div class="carousel-item active">
          <a href="/berlin">          
            <img src="/images/berlin.jpg" class="img-fluid" alt="Los Angeles" />
          </a>
        </div>
        <div class="carousel-item">
          <a href="/hamburg">              
            <img src="/images/hamburg.jpg" class="img-fluid" alt="Chicago" />
          </a>
        </div>
        <div class="carousel-item">
          <a href="/munich">              
            <img src="/images/munich.jpg" class="img-fluid" alt="New York" />
          </a>
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
    <hr class="my-3" />
    <div class="container">
      <div class="row">
        <div class="col">
          <a href="/berlin">               
          <img
            src="/images/berlin.jpg"
            class="w-100 rounded-pill"
            alt="Responsive image"
          />
          </a>
        </div>
        <div class="col">
          <a href="/hamburg">               
          <img
            src="/images/hamburg.jpg"
            class="w-100 rounded-pill"
            alt="Responsive image"
          />
          </a>
        </div>
        <div class="col">
          <a href="/munich">               
          <img
            src="/images/munich.jpg"
            class="w-100 rounded-pill"
            alt="Responsive image"
          />
          </a>               
        </div>
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
</style>
