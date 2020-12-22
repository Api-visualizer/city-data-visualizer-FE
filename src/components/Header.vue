<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-info" style="border-width: 5px !important">
      <a class="navbar-brand" href="/">
        <img src="/images/logo_white.png" />
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Berlin</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/main/covid-graphs">Covid-19 Graphs</a>
              <a class="dropdown-item" href="/main/infections">Infections</a>
              <a class="dropdown-item" href="/main/accidents">Accidents</a>
              <a class="dropdown-item" href="/main/hospitals">Hospitals</a>
              <a class="dropdown-item" href="/main/cancer">Cancer Data</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <autocomplete ref="autocomplete" @keyup.enter="SearchOnSubmit(SearchValue)" :search="search" placeholder="Search" aria-label="Search" :get-result-value="getResultValue" @submit="onSubmit"></autocomplete>
        </form>
        <span class="my-2 my-lg-0">
          <ul class="navbar-nav">
            <li class="nav-item">ss</li>
            <li class="nav-item">
              <a class="nav-link" href="/team">Team</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/faq">FAQ</a>
            </li>
          </ul>
        </span>
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
      console.log(this.SearchData);
    });
  },
};
</script>

<style>
.navMenu[data-v-7f183654] {
  background-color: #343a40 !important;
}
.navMenu[data-v-7f183654] > a {
  margin-top: 1vh;
  width: 10px;
}
.logo {
  width: 3vw;
}
.navbar-expand-lg {
  background-color: #eeeeee !important;
}
</style>
