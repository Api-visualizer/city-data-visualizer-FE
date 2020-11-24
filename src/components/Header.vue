<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <slider
        :width="160"
        format="push"
        direction="left"
        :opacity="0.3"
        :links="[
          { id: 1, text: 'Home', url: 'https://api-visualizer.app.datexis.com/' },
          { id: 2, text: 'Berlin', url: 'https://api-visualizer.app.datexis.com/berlin' },
        ]" 
      ></slider>
      <div class="container-fluid justify-content-end">
        <nav class="navbar navbar-expand-lg navbar-light mr-0">
          <a class="navbar-brand" href="/">
            <img src="/images/logo_colored.png" class="mh-100" />
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="container">
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                </li>
              </ul>
              <span class="navbar-text">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Abouts</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/team">Team</a>
            </li>
          </ul>
        </span>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  </div>
</template>

<script>
import Slider from '@jeremyhamm/vue-slider';
export default {
name: 'Header',
  components: { Slider },
  data() {
    return {
      customStyles: {'navMenu': {'background-color': 'black'}, 'navIcon': {'color': 'blue'}},
    };
  },
};
</script>

<style>
.navMenu[data-v-7f183654]
{
  background-color: #343a40!important;
}
.navMenu[data-v-7f183654]>a{
  margin-top: 1vh;
  width: 10px;
}
.logo {
  width: 3vw
}
.navbar-expand-lg {
  background-color:  #EEEEEE!important;
}
</style>
