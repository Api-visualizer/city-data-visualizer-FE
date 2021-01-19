<template>
  <div>
  <div class="burger" @click="toggleBurger">
    <v-icon dark v-if="open" x-large >mdi-menu</v-icon>
    <v-icon dark v-else large>mdi-window-close</v-icon>
  </div>
  <div v-if="!open" @mouseleave="toggleBurger()">
    <div class="list">
      <p class="first-listelement"></p>
      <div class="listelement-container">
        <p class="listelement"><a href="/">Home</a></p>
      </div>

      <hr>
      <div class="listelement-container">
        <p class="listelement"><a href="/covid-graphs">Graphs</a></p>
      </div>
      <div class="listelement-container">
        <p class="listelement"><a href="/infections">Infections</a></p>
      </div>
      <div class="listelement-container">
        <p class="listelement"><a href="/hospitals">Hospitals</a></p>
      </div>
      <div class="listelement-container">
        <p class="listelement"><a href="/cancer">Cancer</a></p>
      </div>
      <div class="listelement-container">
        <p class="listelement"><a href="/accidents">Accidents</a></p>
      </div>
      <hr>
      <div class="listelement-container">
        <p class="listelement"><a href="/faq">FAQ</a></p>
      </div>
      <div class="listelement-container">
        <p class="listelement"><a href="/team">Team</a></p>
      </div>
    </div>
  </div >
  </div>
</template>
<script>

export default {
  name: "Menu",
  components: {},
  data() {
    return {
      open: true
    }
  },
  methods: {
    toggleBurger() {
      this.open = !this.open
    },
  }

}
</script>
<style scoped>
.list {
  width: 15rem;
  background-color: #477FCD;
  color: white;
  border-radius: 2%;
}
hr {
  background-color: white;
  width: 70%;
  box-shadow: #777777;
  margin: auto;
}
.burger {
  z-index: 9998;
  position: absolute;
  background-color:rgb(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 10px;
  right: 15px
}
.burger:hover {
  cursor: pointer;
}
p>a {
  font-size: x-large;
  color: white;
  text-decoration: none;
}
a:hover {
  cursor: pointer;
}
.listelement {
  width: 100%;
  height: 1.5rem;
}
.listelement-container:hover {
  background-color: #629df0;
}
.first-listelement {
  padding-top: 40px;
}
.listelement-container {
  height: 3em;
  line-height: 3em;
}
</style>
