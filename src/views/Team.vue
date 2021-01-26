<template>
   <div class="jumbotron">
    <h2 class="mt-2">Team</h2>
    <div class="container-fluid">
      <div class="row col-md-12 justify-content-center">
        <div v-for="dev in names_first_row" :key="dev.name" class="col-sm-2">
          <Avatar :name=dev.name :filename=dev.filename />
        </div>
      </div>
      </div>
    <div class="row col-md-12 justify-content-center">
        <div v-for="dev in names_second_row" :key="dev.name" class="col-sm-2">
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

.jumbotron {
  margin: 0px;
  background-color: white;
  background-image: url("data:image/svg+xml,%3Csvg width='504' height='288' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23477fcd' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: repeat;
}

img {
  border-radius: 53%;
  min-width: 40rem;
}
p {
  font-size: large;
  font-weight: bold;
}
row {
  height: 40vw;
}
</style>
