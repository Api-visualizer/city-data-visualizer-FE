<template>
  <div>

    <div class="jumbotron faq">
      <h2 class="headline-4">FAQ</h2>
      <p class="lead pt-4" style="padding-bottom: 24px;">Here you can find the answers to common questions we have received. Use the contact formular on the start page if you have a specific request which is not yet answered.</p>
    </div>

    <div class="jumbotron">
        <div>
        <v-expansion-panels class="w-75 container-fluid ">
          <v-expansion-panel v-for="item in FAQ" :key="item">
            <v-expansion-panel-header class="align-center justify-start pl-5 pr-5">
                <p class="text-center">{{ item.question }}</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <cite>{{ item.answer }}</cite>
                <div v-if="item.link">
                  <a :href="item.link"><ul>Here</ul></a>
                </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>

    <div class="jumbotron disclaimer">
      <h2 class="headline-4 disclaim-header">Disclaimer</h2>
      <p class="lead pt-4" style="padding-bottom: 24px;">This is a students project at the Beuth University of Applied Sciences Berlin.
        We have created this website in behalf of the bachelor's degree program Media Informatics.
        The project City Data Visualizer will end in february 2021. 
        After february the website may be offline or not updated with new data.
        If you have questions or want to get in touch with the team please use the contact formular on the start page.</p>
      <a class="btn btn-primary" href="/#contact" role="button">Contact</a>
    </div>

    <div class="jumbotron">
      <div class="card mx-auto w-75">
        <p class="headline-4 h2">Legal Disclosure</p>
        <div class="card-body ">
          <h5 class="card-title">Information in accordance with Section 5 TMG</h5>
            <br>
          <h6 class="card-subtitle mb-2 text-muted">Accountability for content</h6>
          <p class="card-text text-left">The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. 
          According to statutory provisions, we are furthermore responsible for our own content on these web pages. 
          In this matter, please note that we are not obliged to monitor the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity. 
          Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).</p>
            <br>
          <h6 class="card-subtitle mb-2 text-muted">Accountability for links</h6>
          <p class="card-text text-left">Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages.
            No violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link immediately.</p>
            <br>
          <h6 class="card-subtitle mb-2 text-muted">Copyright</h6>
          <p class="card-text text-left">Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilizing,
            reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights. 
            Individual reproductions of a work are only allowed for private use. The materials from these pages are copyrighted and any unauthorized use may violate copyright laws.</p>
          <!-- <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a> -->
        </div>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: "Faq",

  props: {},

  components: {},
  
  data () {
    return {
      FAQ: [{'question': 'I want to know how many people are currently infected with COVID-19 in my district. ', 'link': 'main/infections', 'answer': 'You will find the answer with the help of our COVID-19 Map.'},
        {'question': 'As a regular cyclist I am interested to know which streets are dangerous to take and should be avoided.', 'link': '/main/accidents', 'answer': 'On our Traffic Safety Map select the type "Bike" to see how many cyclists were involved in recent accidents.'},
        {'question': 'As a scientist I study numbers of COVID-19 infections to find a trend. Are there any computational trends you derive from your numbers?', 'link': '', 'answer': 'We are working on algorithms to make infection trends possible. They will be soon available on this website.'},
        {'question': 'Do you plan to visualize other public available data in the future?', 'link': '', 'answer': 'This is a students project which will end in february 2021. If the interest is hight, we may go on to continue this project and keep it regularly updated.'}]
    }
  },
  
  methods: {},
  
  mounted() {},
};

</script>

<style scoped>
.container-fluid .col {
  margin: 0;
  padding: 0;
}

.headerimage {
  max-height: 15rem;
  object-fit: cover;
}

.title {
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 7.5rem;
  color: white;
  transform: translate(-50%, -50%);
}

.headline-4 {
  font-weight: 300;
  font-size: 3.5rem;
  line-height: 1.2;
}
.container-fluid {
  padding: 0;
}

.col {
  margin: 0;
  padding: 0;
}

.headerimage{
  max-height: 15rem;
  object-fit: cover;
}
.disclaimer {
  padding: 0;
}

.title {
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 7.5rem;
  color: white;
  transform: translate(-50%, -50%);
}

p {
  font-size: large;
}

.jumbotron {
  margin: 0;
}

.jumbotron:nth-child(even) {

  background-color: white;
  background-image: url("data:image/svg+xml,%3Csvg width='504' height='288' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23477fcd' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E");

  background-repeat: repeat;
}

.jumbotron:nth-child(odd) {
  background-color: #FFF;
}

.jumbotron>p {
  padding: 0 20% 0 20%;
}

.btn-primary {
  color: white;
}

.card {
  float: none;
}
.disclaim-header {
  padding-top: 2vw;
}
.faq {
  padding: 2rem 2rem;
}
</style>