<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-info " style="border-width: 5px !important;">
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
              <a class="dropdown-item" href="#">Covid-19</a>
              <a class="dropdown-item" href="#">Infections</a>
              <a class="dropdown-item" href="#">Accidents</a>
              <a class="dropdown-item" href="#">Hospitals</a>
            </div>
          </li>
        </ul>
        <span class="my-2 my-lg-0">
          <ul class="navbar-nav">
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
    return {};
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
