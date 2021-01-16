<template>
  <md-card v-if="email != null" class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">User profile</h6>
      <h4 class="card-title">E-mail: {{ email }}</h4>
      <md-button class="md-round md-success" @click="logout">Logout</md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/user.jpg"),
    },
  },

  computed: {
    ...mapGetters(["userId", "authToken"]),
  },
  methods: {
    ...mapActions(["removeId", "removeAuthToken"]),
     logout() {
      this.removeId();
      this.removeAuthToken();
      this.$router.push({ name: 'Login Register'});
    }
  },
  data() {
    return {
      email: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:9090/user/" + this.userId, {
        headers: { "x-auth-token": this.authToken },
      })
      .then((res) => {
        this.email = res.data.email;
      })
      .catch(() => {
        this.removeId();
        this.removeAuthToken();
        this.$router.push({ name: "Login Register" });
      });
  },
};
</script>
<style></style>
