<template>
  <form>
    <md-card>
      <h3 style="text-align: center">Filters</h3>

      <dialog-map v-on:coordinates="coordinates = $event"></dialog-map>

      <md-card-content>
        <div class="md-layout">
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
  data() {
    return {
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
    },
  },
};
</script>
<style></style>
