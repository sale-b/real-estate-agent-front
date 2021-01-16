<template>
  <form>
    <md-card>
      <h3 style="text-align: center">Filters</h3>

      <dialog-map v-on:coordinates="coordinates = $event"></dialog-map>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="locations">Locations</label>
              <md-select
                v-model="selectedLocations"
                name="locations"
                id="locations"
                multiple
              >
                <md-option
                  v-for="location in locations.locations"
                  :key="location"
                  :value="location"
                  >{{ location }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="micro-locations">Micro Locations</label>
              <md-select
                v-model="selectedMicroLocations"
                name="micro-locations"
                id="micro-locations"
                multiple
              >
                <md-option
                  v-for="location in locations.microLocations"
                  :key="location"
                  :value="location"
                  >{{ location }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Cena</label>
              <md-input v-model="input.email" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Kvadratura</label>
              <md-input v-model="input.password" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="filter"
              >Filter</md-button
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
import DialogMap from "./DialogMap.vue";

export default {
  components: {
    DialogMap,
  },
  name: "login-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  mounted() {
    axios
      .get("http://localhost:9090/get-locations")
      .then((res) => {
        this.locations = res.data;
      })
      .catch((error) => {
        this.notifyVue("top", "center", error.response.data);
      });
  },
  data() {
    return {
      selectedLocations: [],
      selectedMicroLocations: [],
      locations: [],
      coordinates: null,
      input: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    filter() {
      console.log(this.coordinates);
      console.log(this.selectedLocations);
      console.log(this.selectedMicroLocations);
    },
  },
};
</script>


<style>
.md-ripple > span {
  padding: 15px 0 0 50px;
}

.md-menu-content.md-select-menu {
  z-index: 2000 !important;
}

</style>
