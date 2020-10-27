<template>
  <div id="app">
    <Header />
    <img alt="Vue logo" src="./assets/logo.png">
    <div style="min-height:100vh;" class="HeaderHeight">
      <router-view />
    </div>  
    <Footer />  
  </div>
</template>

<script>
import Header from './components/Main/Header.vue'
import Footer from './components/Main/Footer.vue'
import GeneralClasses from "./assets/GeneralClasses.js";

export default {
  name: 'App',
  components: { Header, Footer },
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
