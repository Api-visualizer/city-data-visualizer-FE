<template>
  <v-app class="p-0">
    <div id="app" class="p-0">
      <Menu class="menu"></Menu>
      <div v-if="isNotHomeView()">
        <Header />
      </div>
      <router-view class="content" />
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import GeneralClasses from "./assets/GeneralClasses.js";
import Menu from "@/components/Menu";

export default {
  name: "App",
  components: { Header, Footer, Menu },
  data() {
    return {
      GeneralClasses: GeneralClasses,
    };
  },
  mounted() {
    if (localStorage.getItem(this.GeneralClasses.ValueLanguage()) == null) {
      localStorage.setItem(this.GeneralClasses.ValueLanguage(), "DE");
    }
  },
  methods: {
    isNotHomeView: function () {
      let isHomeView = this.$route.fullPath === "/";
      let isSubPathOfHomeView = this.$route.fullPath === "/#topics";
      return !(isHomeView || isSubPathOfHomeView);
    },
  },
};
</script>

<style >
::-webkit-scrollbar {
  width: 5px;
  background: darkgrey;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px lightgray;
}

::-webkit-scrollbar-thumb {
  background: gray;
}

.Pointer {
  cursor: pointer;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 15px;
  max-height: 100vh;
}

html {
  scroll-behavior: smooth;
}

.info > p {
  text-align: left;
}

.menu {
  z-index: 9997;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
