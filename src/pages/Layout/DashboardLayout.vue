<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <sidebar-link v-show="!userId" to="/login-register">
        <md-icon>person</md-icon>
        <p>Login/Register</p>
      </sidebar-link>
      <sidebar-link v-show="userId" to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TopNavbar,
    DashboardContent,
  },
  computed: mapGetters(['userId']), 
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar.jpg"),
    };
  },
};
</script>
