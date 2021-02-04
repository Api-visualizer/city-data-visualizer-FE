<template>
  <div>
    <div class="burger" @click="toggleBurger">
      <v-icon dark v-if="open" x-large >mdi-menu</v-icon>
      <v-icon dark v-else large>mdi-window-close</v-icon>
    </div>
    <div v-if="!open" @mouseleave="toggleBurger()">
      <div class="list">
        <div class="listelement-container">
          <p class="listelement"><a href="/">Home</a></p>
        </div>
        <hr>
        <div class="listelement-container dropdown">
          <p class="dropdown-toggle" data-toggle="dropdown" role="button" href="#">COVID-19</p>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/infections">Per District</a>
            <a class="dropdown-item" href="/covid-age">Per Age Group</a>
            <a class="dropdown-item" href="/covid-average">Rolling Average</a>
          </div>
        </div>
        <div class="listelement-container">
          <p class="listelement"><a href="/hospitals">Hospital Capacities</a></p>
        </div>
        <div class="listelement-container">
          <p class="listelement"><a href="/cancer">Cancer Cases</a></p>
        </div>
        <div class="listelement-container">
          <p class="listelement-last"><a href="/accidents">Traffic Safety</a></p>
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
  width: auto;
  display: block;
  padding: 0 24px;
  background-color: #477FCD;
  color: white;
  border-radius: 2%;
}
hr {
  background-color: white;
  width: 98%;
  box-shadow: #777777;
  margin: auto;
}
.burger {
  z-index: 9998;
  position: absolute;
  padding: 5px;
  border-radius: 10px;
  right: 0px
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
.listelement-container {
  height: 3em;
  line-height: 3em;
}
.listelement-last {
  width: 100%;
  height: 1.5rem;
  padding-bottom: 1rem;
}
.dropdown-toggle {
  font-size: 1.4rem;
  padding-top: 0.3rem;
}
.dropdown-menu {
  width: 100%;
  background-color: #EFF5FD
;
}
</style>
