<template>
  <div>
    <h2 class="display-4">Contact</h2>
    <form name="contact_form" class="form text-left" @submit="sendForm" method="post">
    <div class="row">
      <div class="col">
        <label for="first_name">First Name</label>
        <input type="text" id="first_name" class="form-control" value="" required>
      </div>
      <div class="col">
        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" class="form-control" value="" required>
      </div>
    </div>
    <div class="form-group">
      <label for="email_field">Email address</label>
      <input type="email" class="form-control" id="email_field" value="" required>
    </div>
    <div class="form-group">
      <label for="message_field">Message</label>
      <textarea class="form-control" id="message_field" rows="3" value="Hello!" required></textarea>
    </div>
      <div class="row">
        <div class="col-1">
          <button type="submit" class="btn btn-primary">Send</button>
        </div>
        <div class="col-9">
          <div class="d-inline-flex">
            <i class="iconify fail align-content-end" data-icon="mdi:exclamation-thick" />
            <p class="notsent">Oops. Something went wrong. Please contact us directly or try again.</p>
          </div>
          <div class="d-inline-flex align-content-end">
            <i v-if="sent === true" class="iconify success" data-icon="mdi:check" />
            <p v-if="sent === true" class="sent">Message sent!</p>
          </div>
          <v-progress-circular v-show="indeterminate" :indeterminate="indeterminate" class="spinner" color="primary" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>

export default {
  name: "Contact",
  data () {
    return {
      indeterminate: false,
      sent: null
    }
  },
  methods: {
    change_state(success) {
      this.sent = success
      this.indeterminate = false
      console.log('this sent is ' + this.sent + 'and inde is ' + this.indeterminate)
    },
    sendForm:function(e) {
      this.indeterminate = true
      e.preventDefault();
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

      let loading = () => {
        if (XHR.status >= 200 && XHR.status < 300) {
          console.log('inside loading')
          console.log(XHR.responseText);
          this.change_state(true)
        } else {
          console.warn(XHR.statusText, XHR.responseText);
          this.change_state(false)
        }
        console.log(event)
      }
      XHR.addEventListener( 'load', loading);
      XHR.setRequestHeader('Content-Type', 'application/json');

      XHR.send(JSON.stringify(data_json));
    }
  },
};
</script>

<style scoped>

.form {
  padding: 0 20% 0 20%;
}

.form .row {
  padding: 0px;
}
.btn-primary {
  color: white;
}
.spinner {
  width: 1.5rem;
  height: 1.5rem
}
.success {
  width: 1.5rem;
  height: 1.5rem;
  color: darkseagreen;
  margin-left: 2rem;
}

.fail {
  width: 1.5rem;
  height: 1.5rem;
  color: red;
  margin-left: 2rem;
}
sent {
  color: darkseagreen;
}

notsent {
  color: red;
}

p {
  margin-left: 0.5rem;
}
.d-inline-flex {
  margin-top: 0.6rem;
}
</style>