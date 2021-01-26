<template>
  <div class="card">
    <div class="burger" @click="toggleBurger">
      <v-icon dark v-if="open" x-large >mdi-menu</v-icon>
      <v-icon dark v-else large>mdi-window-close</v-icon>
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

  props: ['content', 'title', 'subtitle'],
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
  z-index: 10000;
}
</style>
