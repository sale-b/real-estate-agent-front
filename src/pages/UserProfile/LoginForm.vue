<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Login</h4>
        <p class="category">Sign in to your profile</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="input.email" type="email" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Password</label>
              <md-input
                v-model="input.password"
                type="password"
                required
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="login"
              >Login</md-button
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
  name: "login-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      input: {
        email: null,
        password: null,
      },
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
    login() {
      let error = false;
      if (!this.input.email || !this.input.password) {
        this.notifyVue("top", "center", "All fields are required");
        error = true;
      }
      if (!this.validEmail(this.input.email)) {
        this.notifyVue("top", "center", "Invalid email format");
        error = true;
      }
      if (!error) {
        axios
          .post("http://localhost:9090/login", this.input)
          .then((res) => {
            this.setAuthToken(res.headers["x-auth-token"]);
            this.setId(res.data.id);
            this.$router.push("user");
          })
          .catch((error) => {
            this.input.email = null;
            this.input.password = null;
            this.notifyVue("top", "center", error.response.data.message);
          });
      }
    },
  },
};
</script>
<style></style>
