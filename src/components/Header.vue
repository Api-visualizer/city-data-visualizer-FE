<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <slider
        :width="300"
        format="push"
        direction="left"
        :opacity="0.15"
        :links="[
          { id: 1, text: 'Home', url: '/' },
          { id: 2, text: 'Berlin', url: '/berlin' },
        ]" 
      ></slider>
      <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="/">
        <img src="/images/logo_color_m.png" class="w-50" />
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <span class="navbar-text">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Abouts</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/team">Team</a>
            </li>
          </ul>
        </span>
      </div>
    </nav>
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
</style>
