<template>
  <nav class="navbar navbar-dark" :style="[landing ? {'background-color':'#343a40'} : {'background-color':'none'} ]">
    <a class="navbar-brand" href="/" :style="[landing ? {} : {'visibility':'hidden'} ]">
      <img src="/images/logo_white.png" />
    </a>
    <div class="search">
      <v-form ref="titleForm" class="form-inline my-lg-0" style="z-index: 99999">
        <v-autocomplete ref="InputSearchTitle" color="grey" background-color="white" class="subtitle-2" hide-no-data filled rounded clearable dense return-object v-model="SearchName" :search-input.sync="SearchApply" :items="AutoCompleteItems" :loading="IsLoading" item-text="Keywords" item-value="Keywords" label="Search">
          <template v-slot:item="data">
            <v-list-item-content style="width:40vw;">
              <v-list-item-title class="text-left title bold" v-html="data.item.Value"></v-list-item-title>
              <v-list-item-subtitle class="text-left text-wrap" v-html="data.item.Subtitle"></v-list-item-subtitle>              
            </v-list-item-content>   
          </template>
        </v-autocomplete>
      </v-form>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',

  props: ['landing'],
  data() {
    return {
      // Auto Complete      
      AutoCompleteData: [],
      IsLoading: false,
      SearchName: null,
      SearchApply: null,
    };
  },
  computed: {
    AutoCompleteItems() {
      return this.AutoCompleteData;
    },
  },
  watch: {
    SearchName(SearchValue) {
      this.$router.push(SearchValue.Link);
      // Reset SearchName and remove focus form searchbar     
      this.$nextTick(() => {
        this.SearchName = ""
        this.$refs.InputSearchTitle.blur()  
      })       
    },
    SearchApply() {
      // Items have already been loaded      
      if (this.AutoCompleteItems.length > 0) return;
      if (this.IsLoading) return;
      this.IsLoading = true;

      fetch('/images/SearchTerms.json')
        .then((res) => res.json())
        .then((res) => {
          this.AutoCompleteData = res.SearchElements;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.IsLoading = false));
    },
  },
  methods: {},
  mounted() {},
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
  right: 70px;
}
</style>
