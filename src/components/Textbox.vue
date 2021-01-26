<template>
  <div class="card">
    <div class="burger" @click="toggleBurger">
      <v-icon dark v-if="open" x-large >mdi-menu</v-icon>
      <v-icon dark v-else large>mdi-window-close</v-icon>
    </div>
    <div class="card-body" v-if="open">
      <h5 class="card-title">{{ title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ subtitle }}</h6>
      <span v-html="content"></span>
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
  box-shadow: 22px 22px 8px -3px #477FCD;
}
.card-body {
  text-align: justify;
}
.burger {
  z-index: 10000;
}
</style>
