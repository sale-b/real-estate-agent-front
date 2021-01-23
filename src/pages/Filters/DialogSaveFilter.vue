<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Save filter</md-dialog-title>

      <div style="padding: 30px">
        <md-field>
          <label>Filter name:</label>
          <md-input v-model="filterName"></md-input>
        </md-field>
        <md-switch class="md-primary" v-model="subscribed"
          >Notifie me</md-switch
        >
      </div>

      <md-dialog-actions>
        <md-button class="md-info" @click="showDialog = false">Close</md-button>
        <md-button class="md-info" @click="saveFiltering">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-info md-raised" @click="showDialog = true"
      >Save filters</md-button
    >
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userId", "authToken"]),
  },
  methods: {
    saveFiltering() {
      this.filters.subscribed = this.subscribed;
      this.filters.tittle = this.filterName;
      // console.log(this.filters);

      axios
        .post(
          "http://localhost:9090/save-filters",
          {
            filters: this.filters,
            userId: this.userId.toString(),
          },
          {
            headers: { "x-auth-token": this.authToken },
          }
        )
        .then((res) => {
          this.filterName = "Untitled";
          this.subscribed = false;
          this.showDialog = false;
              this.$notify({
            message: "Filter saved!",
            icon: "done",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
        })
        .catch((error) => {
          this.filterName = "Untitled";
          this.subscribed = false;
          this.showDialog = false;
        
          if (error.response in window) {
              this.$notify({
            message: error.message,
            icon: "add_alert",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "danger",
          });
          } else {
             this.removeId();
            this.removeAuthToken();
            this.$router.push({ name: "Login Register" });
               this.$notify({
            message: error.response.data.message,
            icon: "add_alert",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "danger",
          });
          }
        });
    },
    ...mapActions(["removeId", "removeAuthToken"]),
  },
  props: {
    filters: Object,
  },
  data: () => ({
    filterName: "Untitled",
    showDialog: false,
    subscribed: false,
  }),
};
</script>
