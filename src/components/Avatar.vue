<template>
    <div>
      <v-avatar>
        <img alt="Avatar" class="img-fluid" :src="require(`@/assets/${filename}`)">
      </v-avatar>
      <h4> {{ name }}</h4>
    </div>
</template>

<script>
export default {
  name: "LandingPage",

  props: ['name', 'filename'],

  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  border-radius: 53%;
  max-width: 10rem;
}
h4 {
  font-size: medium;
  margin-top: 1vh;
}

</style>
