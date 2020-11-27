<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h1 class="display-4">Berlin</h1>
          <img src="/images/berlin-alex.jpg" class="w-100 headerimage" alt="Los Angeles" />
        </div>
      </div>
    </div>
      <div class="mt-10">
        <v-expansion-panels class="w-75 mt-10 container-fluid ">
          <v-expansion-panel v-for="item in FAQ" :key="item">
            <v-expansion-panel-header class="align-center justify-start pl-5 pr-5">
                <p>{{ item.question }}</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ item.answer }}
              <a :href="item.link"><ul> see visual information</ul></a>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
  </div>
</template>

<script>

export default {
  name: "BerlinOverview",
  props: {},
  data () {
    return {
      FAQ: [{'question': 'I live in Kreuzberg, Berlin. I want to know how...', 'link': '/berlin/charts', 'answer': 'lorem ipsum explaining text. '},
        {'question': 'I am governing mayor in Berlin. I want to know how...', 'link': '/berlin/karte/corona', 'answer': 'lorem ipsum explaining text. ' },
        {'question': 'I am scientist living in Berlin and I am interested in predictions in addition to information of current situation in order to give advices', 'link': '/berlin/charts', 'answer': 'lorem ipsum explaining text. '},
        {'question': 'I would like to know how I can walk to my office in a safe way. Which crossroads are more dangerous than others?', 'link': '/berlin/karte/accidents', 'answer': 'lorem ipsum explaining text. '}]
    }
  },
  methods: {},
  mounted() {},
};

</script>
<style scoped>
.headerimage{
  max-height: 6rem;
  border-radius: 3rem;
  object-fit: cover;
}

p {
  font-size: large;
  font-weight: bold;
}
</style>