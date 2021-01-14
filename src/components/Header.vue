<template>
  <div>
    <nav class="navbar navbar-dark bg-dark border-bottom border-info" style="border-width: 5px !important">
      <a class="navbar-brand" href="/">
        <img src="/images/logo_white.png" />
      </a>

      <div class="search">
        <form class="form-inline my-2 my-lg-0">
          <autocomplete ref="autocomplete" @keyup.enter="SearchOnSubmit(SearchValue)" :search="search" placeholder="Search" aria-label="Search" :get-result-value="getResultValue" @submit="onSubmit"></autocomplete>
        </form>
      </div>

    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      SearchValue: '',
      SearchData: {},
    };
  },
  methods: {
    getResultValue(result) {
      return result.Value;
    },
    onSubmit(result) {
      this.$router.push(result.Link);
    },
    SearchOnSubmit(SearchValue) {
      this.$router.push(SearchValue.Link);
    },
    search(input) {
      this.SearchValue = input;
      if (input.length < 1) {
        return [];
      }
      return this.SearchData.filter((Element) => {
        return Element.Value.toLowerCase().startsWith(input.toLowerCase());
      });
    },
  },
  mounted() {
    const url = '/images/SearchTerms.json';
    this.$http.get(url).then((Result) => {
      this.SearchData = Result.data.SearchElements;
    });
  },
};
</script>

<style>

.navMenu[data-v-7f183654] > a {
  margin-top: 1vh;
  width: 10px;
  height: 20px !important;
}

img {
  height: 45px;
}

.search {
  position: absolute;
  top: 10px;
  right: 100px
}

</style>
