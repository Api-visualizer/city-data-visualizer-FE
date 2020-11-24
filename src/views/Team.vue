<template>
  <div>
    <h2 class="mt-4">Our Team</h2>
    <div class="container-fluid mt-5">
      <div class="row ml-5">
        <p>Backend</p>
        </div>
      <div class="d-flex justify-content-center row m-4">
        <div v-for="dev in names_first_row" :key="dev.name" class="col-sm-3">
          <Avatar :name=dev.name :filename=dev.filename />
        </div>
      </div>
      </div>
    <div class="row ml-5">
      <p>Frontend</p>
    </div>
    <div class="row">
        <div v-for="dev in names_second_row" :key="dev.name" class="col-sm-3">
          <Avatar :name=dev.name :filename=dev.filename />
        </div>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  name: "LandingPage",
  components: { Avatar },
  data() {
    return {
      names_first_row: [
        { 'name': 'Pierre Fabarius', 'filename': 'pierre.png' },
        { 'name': 'Katharina Sachs', 'filename': 'kathi.png' },
        { 'name': 'Karl Brendel', 'filename': 'karl.png'}],
      names_second_row: [
        { 'name': 'Niklas Rupprecht', 'filename': 'niklas.png' },
        { 'name': 'Janine Leona Schleicher', 'filename': 'janine.png'},
        { 'name': 'Anas Alkahkim', 'filename': 'anas.png' },
        { 'name': 'Ali Alkhateeb', 'filename': 'ali.png'} ]
    };
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  border-radius: 53%;
  min-width: 40rem;
}
.col-sm-3 {
  margin-top: 3vh;
}
p {
  font-size: large;
  font-weight: bold;
}
row {
  height: 40vw;
}
</style>
