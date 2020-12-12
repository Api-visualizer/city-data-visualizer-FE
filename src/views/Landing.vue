<template>
  <div>
    <div id="demo" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul>

      <!-- The slideshow -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/images/berlin1.jpg" class="img-fluid" alt="Alexanderplatz" />
        </div>
        <div class="carousel-item">
          <img src="/images/berlin2.jpg" class="img-fluid" alt="Brandenburger Tor" />
        </div>
        <div class="carousel-item">
          <img src="/images/berlin3.jpg" class="img-fluid" alt="Brandenburger Tor" />
        </div>
      </div>
    </div>

    <div class="main-text hidden-xs">
      <div class="col-md-12 text-center">
        <img src="/images/logo_color_m.png" class="img-fluid" alt="Brandenburger Tor" />
      </div>
    </div>

    <div id="content">
      <div class="jumbotron">
        <h1 class="display-4">City Data Visualizer</h1>
        <p class="lead pt-4" style="padding-bottom: 24px;">City Data Visualizer provides helpful visualizations for complex health data. With the help of open data, we hope to give both Berlin's administration, scientists and residents a better understanding of current health risks or positive impacts that are occurring in the city.</p>
        <p class="text-center"></p>

        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-double-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>

    </div>

      <div class="jumbotron">
        <div class="row">

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Covid-19</h5>
                <h6 class="card-subtitle mb-2 text-muted">Charts/Graphs</h6>
                <p class="card-text">Various charts and graphs allow you to get a deep understanding on the development of the COVID-19 virus.</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary" href="/main/covid-graphs" role="button">Here</a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Infections</h5>
                <h6 class="card-subtitle mb-2 text-muted">Heatmap</h6>
                <p class="card-text">The Heatmap can give you a quick overview of the actual numbers of infections per district.</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary" href="/main/infections" role="button">Here</a>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Accidents</h5>
                <h6 class="card-subtitle mb-2 text-muted">Heatmap</h6>
                <p class="card-text">The Heatmap gives you an overview of dangerous crossroads in Berlin. Stay safe!</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary" href="/main/accidents" role="button">Here</a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Hospitals</h5>
                <h6 class="card-subtitle mb-2 text-muted">Map</h6>
                <p class="card-text">The map shows hospitals and their capacities during covid19 in berlin. </p>
              </div>
              <div class="card-footer">
                <a class="btn btn-primary" href="/main/hospitals" role="button">Here</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="jumbotron">
        <h2 class="display-4">FAQ</h2>
        <p class="lead pt-4" style="padding-bottom: 24px;">We have listed frequently asked questions under the FAQ section. If you cannot find an proper answer to your question, use the form below to propose your request. We kindly ask you to refer the FAQ beforehand.</p>
        <a class="btn btn-primary" href="/faq" role="button">Here</a>
      </div>

      <div class="jumbotron">
        <h2 class="display-4">Contact</h2>
        <form name="contact_form" class="form text-left" @submit="sendForm" method="post">
          <div class="row">
            <div class="col">
              <label for="first_name">First Name</label>
              <input type="text" id="first_name" class="form-control" value="John" required>
            </div>
            <div class="col">
              <label for="last_name">Last Name</label>
              <input type="text" id="last_name" class="form-control" value="Doe" required>
            </div>
          </div>
          <div class="form-group">
            <label for="email_field">Email address</label>
            <input type="email" class="form-control" id="email_field" value="john@doe.org" required>
          </div>
          <div class="form-group">
            <label for="message_field">Message</label>
            <textarea class="form-control" id="message_field" rows="3" value="Hello!" required></textarea>
          </div>
            <button type="submit" class="btn btn-primary">Send</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",

  props: {},

  components: {},

  data() {
    return {};
  },

  methods: {
    sendForm:function(e) {
      e.preventDefault();
      // let first_name = document.forms["contact_form"]["first_name"].value;
      const form_data = document.forms["contact_form"];
      const first_name = form_data['first_name'].value;
      const last_name = form_data['last_name'].value;
      const user_mail = form_data['email_field'].value;
      const message = form_data['message_field'].value;
      const data_json = {subject: "NEW: City Data Visualizer", first_name, last_name, user_mail, message};
      console.log(JSON.stringify(data_json));

      const XHR = new XMLHttpRequest();
      const URL = 'http://cl-svc-250.ris.beuth-hochschule.de:5000/mail'

      
      
      // send data
      XHR.open('POST', URL);
      // XHR.addEventListener( 'load', function(event) {
      //   alert( 'Yeah! Data sent and response loaded.' );
      //   console.log(event);
      // } );

      XHR.setRequestHeader('Content-Type', 'application/json');

      // cors
      // XHR.setRequestHeader("Access-Control-Allow-Origin", "*");
      // XHR.setRequestHeader("Access-Control-Allow-Headers", "*");
      // XHR.setRequestHeader("Access-Control-Allow-Credentials", "true");
      XHR.send(JSON.stringify(data_json));
      console.log(XHR.getResponseHeader("Content-Type"));
    }
  },

  mounted() {},
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid{
  padding: 0;
}

.main-text{
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 250px;
  transform: translate(-50%, -50%);
}

.col-md-12 {
  padding: 0;
}

.jumbotron {
  margin: 0;
}

.jumbotron:nth-child(odd) {
  background-color: #FFF;
}

.jumbotron>p {
  padding: 0 20% 0 20%;
}

.row {
  padding: 0 20% 0 20%;
}

.card-footer{
  background-color: white;
}

.btn-primary {
  color: white;
}

.carousel-item .img-fluid {
  width: 100%;
  height: 500px;
  object-fit: cover;
}
ul.no-bullets {
  list-style-type: none;
}

svg {
  position: relative;
  animation-name: move;
  animation-duration: 2s;
  animation-delay: 3s;
  animation-iteration-count: infinite;
}

@keyframes move {
  0%   {top: 0px;}
  50%  {top: 5px;}
  100% {top: 0px;}
}


.form {
  padding: 0 20% 0 20%;
}

.form .row {
  padding: 0px;
}
</style>
