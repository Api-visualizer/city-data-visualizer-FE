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

.info {
    margin: 18px;
    padding: 10px 12px;
    font: 16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}

.info > p {
  text-align: left;
}
</style>
