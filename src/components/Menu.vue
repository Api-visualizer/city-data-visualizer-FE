<template>
  <div>
  <div class="burger" @mouseover="toggleBurger()">
    <v-icon dark v-if="open" x-large>mdi-menu</v-icon>
    <v-icon dark v-else large>mdi-window-close</v-icon>
  </div>
  <div v-if="!open" @mouseleave="toggleBurger()">
    <div class="list">
      <p><a href="/">Home</a></p>
      <hr>
      <p><a href="/main/covid-graphs">Graphs</a></p>
      <p><a href="/main/infections">Infections</a></p>
      <p><a href="/main/hospitals">Hospitals</a></p>
      <p><a href="/main/cancer">Cancer</a></p>
      <p><a href="/main/accidents">Accidents</a></p>
      <hr>
      <p><a href="/faq">FAQ</a></p>
      <p><a href="/team">Team</a></p>
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
  padding: 75px 50px 20px 50px;
  width: auto;
  background-color: #477FCD;
  color: white;
  border-radius: 2%;
}
hr {
  background-color: white;
}
.burger {
  z-index: 9999;
  position: absolute;
  top: 5px;
  right: 15px
}
.burger:hover {
  cursor: pointer;
}
p>a {
  font-size: large;
  color: white;
}
a:hover {
  cursor: pointer;
}
</style>