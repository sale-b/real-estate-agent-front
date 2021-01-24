<template>
  <md-card v-if="email != null" class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">User profile</h6>
      <h4 class="card-title">E-mail: {{ email }}</h4>
      <md-button class="md-round md-success" @click="logout">Logout</md-button>

      <md-list v-if="savedFilters.length > 0" :md-expand-single="false">
        <md-list-item md-expand>
          <md-icon>filter_alt</md-icon>
          <span class="md-list-item-text">Saved filters</span>

          <md-list slot="md-expand">
            <md-list-item v-for="filter in savedFilters" :key="filter.id">
              <div class="filters-list" @click="getFilter(filter.id)">
                {{ filter.tittle }}
                <md-icon
                  class="mail-icon"
                  :class="{ 'mail-icon-cros': !filter.email_subscribed }"
                  >forward_to_inbox</md-icon
                >
              </div>
              <dialog-delete-filter
                v-on:filterDeleted="removeFromList($event)"
                :filter="filter"
              ></dialog-delete-filter>
            </md-list-item>
          </md-list>
        </md-list-item>
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import DialogDeleteFilter from "./../Filters/DialogDeleteFilter";
import EventBus from "./../../event-bus";

export default {
  components: { DialogDeleteFilter },
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
    removeFromList(filterId) {
      this.savedFilters = this.savedFilters.filter(function (
        filter,
        index,
        arr
      ) {
        return filter.id !== filterId;
      });
    },
    getFilter(filterId) {
      axios
        .get("http://localhost:9090/saved-filter/" + filterId, {
          headers: {
            "user-id": this.userId.toString(),
            "x-auth-token": this.authToken,
          },
        })
        .then((res) => {
          EventBus.$emit("filterSelected", res.data.savedFilter);
        })
        .catch(() => {
          this.removeId();
          this.removeAuthToken();
          this.$router.push({ name: "Login Register" });
        });
    },
    ...mapActions(["removeId", "removeAuthToken"]),
    logout() {
      this.removeId();
      this.removeAuthToken();
      this.$router.push({ name: "Login Register" });
    },
    alert(msg) {
      alert(msg);
    },
  },
  data() {
    return {
      savedFilters: [],
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

    EventBus.$on("filterSaved", (filter) => {
      this.savedFilters.push(filter);
    });

    axios
      .get("http://localhost:9090/saved-filters/" + this.userId, {
        headers: { "x-auth-token": this.authToken },
      })
      .then((res) => {
        this.savedFilters = res.data.savedFilters;
      })
      .catch(() => {
        this.removeId();
        this.removeAuthToken();
        this.$router.push({ name: "Login Register" });
      });
  },
};
</script>
<style scoped>
.filters-list {
  padding: 10px;
  width: 80%;
  height: 40px;
}

:hover.filters-list {
  background-color: #c8c8c8;
  cursor: pointer;
  border-radius: 5px;
}

.mail-icon {
  padding-bottom: 5px;
  float: right;
}

.mail-icon-cros:after {
  position: absolute;
  content: "/";
  color: rgba(0, 0, 0, 0.54);
  font-weight: 700;
  font-size: 1.7em;
  float: right;
  top: 4px;
}
</style>
