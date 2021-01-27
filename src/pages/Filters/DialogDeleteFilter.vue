<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Delete filter</md-dialog-title>

      <div style="padding: 30px">
        Are you sure you whant delete filter named: {{ filter.tittle }}
      </div>

      <md-dialog-actions>
        <md-button class="md-info" @click="showHideDialog()">Cancel</md-button>
        <md-button class="md-info" @click="deleteFilter()">Delete</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button
      class="md-icon-button md-raised md-danger"
      @click="showHideDialog()"
      style="height: 40px; font-size: 18px; margin: 0"
    >
      X
    </md-button>
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
    showHideDialog() {
      this.showDialog = !this.showDialog;
      this.$sidebar.showSidebar = false;
    },
    deleteFilter() {
      axios
        .get("http://localhost:9090/delete-saved-filter/" + this.filter.id, {
          headers: {
            "user-id": this.userId.toString(),
            "x-auth-token": this.authToken,
          },
        })
        .then((res) => {

          this.showDialog = false;
          if (res.data.deleted == 1){
            this.$emit("filterDeleted", this.filter.id);
          }
        
        })
        .catch((error) => {
              if (error.response in window) {
            this.$notify({
              message: error.message,
              icon: "add_alert",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "danger",
            });
          } else {
            if (error.response.data.message == "Not authorized!") {
              this.removeId();
              this.removeAuthToken();
              this.$router.push({ name: "Login Register" });
            }
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
    filter: Object,
  },
  data: () => ({
    filterName: "Untitled",
    showDialog: false,
    subscribed: false,
  }),
};
</script>
