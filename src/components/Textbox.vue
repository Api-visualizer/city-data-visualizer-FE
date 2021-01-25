<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ subtitle }}</h6>
      <span v-html="content"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Textbox",

  props: ['content', 'title', 'subtitle']
}

</script>

<style scoped>
.card  {
  box-shadow: 12px 12px 4px 0px #477fcdbe;
}
</style>
