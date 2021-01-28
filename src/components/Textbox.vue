<template>
  <div class="card">
    <div class="burger" @click="toggleBurger">
      <v-icon v-if="open" >mdi-fullscreen-exit</v-icon>
      <v-icon v-else>mdi-fullscreen</v-icon>
    </div>
    <div class="card-body" v-if="open">
      <h5 class="card-title">{{ title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ subtitle }}</h6>
      <span v-html="content"></span><br><br>
      <a :href=link class="card-link">Where is this data from?</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Textbox",

  props: ['content', 'title', 'subtitle', 'link'],
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
.card  {
  box-shadow: 12px 12px 4px 0px #477fcdbe;
}
.card-body {
  text-align: justify;
}
.burger {
  margin-top: 0.5rem;
  z-index: 9999;
  position: absolute;
  right: 10px;
}
</style>
