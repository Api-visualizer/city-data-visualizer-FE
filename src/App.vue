<template>
  <div id="app" class="p-0">
    <Header />
    <div style="min-height:100vh;" class="">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import GeneralClasses from "./assets/GeneralClasses.js";

export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      GeneralClasses: GeneralClasses,
    };
  },
  mounted() {
    if (localStorage.getItem(this.GeneralClasses.ValueLanguage()) == null)
    {
      localStorage.setItem(this.GeneralClasses.ValueLanguage(), "DE");
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 15px;
}
</style>
