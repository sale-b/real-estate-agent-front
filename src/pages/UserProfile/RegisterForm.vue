<template>
  <form>
    <md-card>
      <md-card-header data-background-color="blue">
        <h4 class="title">Register</h4>
        <p class="category">Complete your profile</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="emailadress" type="email" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Password</label>
              <md-input v-model="password" type="password" required></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Password</label>
              <md-input
                v-model="confirmPassword"
                type="password"
                required
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-info" @click="register"
              >Create Profile</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "register-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      emailadress: null,
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
     ...mapActions(["setId", "setAuthToken"]),
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    notifyVue(verticalAlign, horizontalAlign, message) {
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger",
      });
    },
    register() {
      let error = false;

      if (!this.emailadress || !this.password || !this.confirmPassword) {

        this.notifyVue("top", "center", "All fields are required");
        error = true;
      }
      if (!this.validEmail(this.emailadress)) {
        this.notifyVue("top", "center", "Invalid email format");
        error = true;
      }
      if (this.password !== this.confirmPassword) {
        this.notifyVue("top", "center", "Passwords are not the same");
        error = true;
      } 
      if (!error) {
        axios
          .post("http://localhost:9090/register", {
            email: this.emailadress,
            password: this.password,
          })
          .then((res) => {
            this.setAuthToken(res.headers["x-auth-token"]);
            this.setId(res.data.id);
            this.$router.push("user");
          })
            .catch((error) => {
            this.emailadress = null;
            this.password = null;
            this.confirmPassword = null;
            this.notifyVue("top", "center", error.response.data.message);
          });
      }
    },
  },
};
</script>
<style></style>
