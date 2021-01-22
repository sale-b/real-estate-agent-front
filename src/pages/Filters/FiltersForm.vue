<template>
  <form>
    <md-card style="overflow: hidden">
      <h3 style="text-align: center">Filters</h3>

      <dialog-map
        v-show="userId"
        v-on:coordinates="filter.coordinates = $event"
      ></dialog-map>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="locations">Locations</label>
              <md-select
                v-model="filter.selectedLocations"
                name="locations"
                id="locations"
                multiple
              >
                <md-option
                  v-for="location in locations"
                  :key="location"
                  :value="location"
                  >{{ location }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="micro-locations">Micro locations</label>
              <md-select
                v-model="filter.selectedMicroLocations"
                name="micro-locations"
                id="micro-locations"
                multiple
              >
                <md-option
                  v-for="location in microLocations"
                  :key="location"
                  :value="location"
                  >{{ location }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>Min price &euro;</label>
              <md-input
                v-model="filter.selectedMinPrice"
                type="text"
                style="height: 60px; padding: 30px 0 0 0"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>Max price&euro;</label>
              <md-input
                v-model="filter.selectedMaxPrice"
                type="text"
                style="height: 60px; padding: 30px 0 0 0"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>Min &zwnj; area m<sup>2</sup></label>
              <md-input
                v-model="filter.selectedMinArea"
                type="text"
                style="height: 60px; padding: 30px 0 0 0"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>Max area m<sup>2</sup></label>
              <md-input
                v-model="filter.selectedMaxArea"
                type="text"
                style="height: 60px; padding: 30px 0 0 0"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>Min rooms</label>
              <md-input
                v-model="filter.selectedMinRooms"
                type="text"
                style="height: 60px; padding: 30px 0 0 0"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>Max rooms</label>
              <md-input
                v-model="filter.selectedMaxRooms"
                type="text"
                style="height: 60px; padding: 30px 0 0 0"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="ad-types">Ad type</label>
              <md-select
                v-model="filter.adType"
                name="ad-types"
                id="ad-types"
                multiple
              >
                <md-option
                  v-for="adType in adTypes"
                  :key="adType"
                  :value="adType"
                  >{{ adType }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="real-estate-types">Real estate type</label>
              <md-select
                v-model="filter.realEstateType"
                name="real-estate-types"
                id="real-estate-types"
                multiple
              >
                <md-option
                  v-for="realEstateType in realEstateTypes"
                  :key="realEstateType"
                  :value="realEstateType"
                  >{{ realEstateType }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="heating-types">Heating type</label>
              <md-select
                v-model="filter.heatingType"
                name="heating-types"
                id="heating-types"
                multiple
              >
                <md-option
                  v-for="heatingType in heatingTypes"
                  :key="heatingType"
                  :value="heatingType"
                  >{{ heatingType }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="floors">Floors</label>
              <md-select
                v-model="filter.floors"
                name="floors"
                id="floors"
                multiple
              >
                <md-option
                  v-for="floor in floors"
                  :key="floor"
                  :value="floor"
                  >{{ floor }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="furniture">Furniture</label>
              <md-select
                v-model="filter.furniture"
                name="furniture"
                id="furniture"
                multiple
              >
                <md-option
                  v-for="furniture in furnitures"
                  :key="furniture"
                  :value="furniture"
                  >{{ furniture }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <md-switch class="md-primary" v-model="filter.pictures"
            >Only with photos</md-switch
          >

          <div class="md-layout-item md-size-33 text-left">
            <span>
              <md-button
                class="md-icon-button md-raised md-danger"
                @click="clearFilters"
                style="height: 41px; font-size: 20px"
              >
                X
              </md-button>
              <md-tooltip md-delay="1000">Clear all filters</md-tooltip>
            </span>
          </div>

          <div class="md-layout-item md-size-33 text-left">
            <md-button class="md-raised md-success" @click="filtering"
              >Filter</md-button
            >
          </div>

          <md-switch
            v-show="userId"
            class="md-primary"
            v-model="filter.subscribed"
            >Notifie me</md-switch
          >

          <div v-show="userId" class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-info">Save filtering</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import DialogMap from "./DialogMap.vue";
import EventBus from "../../event-bus";
import Vue from "vue";

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
  computed: {
    selectedLocations() {
      return this.filter.selectedLocations;
    },
    ...mapGetters(["userId"]),
  },
  watch: {
    $route(to, from) {
      this.filter.selectedLocations = this.setArray(
        this.$route.query.locations
      );
      this.filter.selectedMicroLocations = this.setArray(
        this.$route.query.microLocations
      );
      this.filter.selectedMaxPrice = this.setNum(this.$route.query.priceLes);
      this.filter.selectedMinPrice = this.setNum(this.$route.query.priceHigher);
      this.filter.selectedMaxArea = this.setNum(this.$route.query.spaceAreaLes);
      this.filter.selectedMinArea = this.setNum(
        this.$route.query.spaceAreaHigher
      );
      this.filter.selectedMaxRooms = this.setNum(
        this.$route.query.roomsNumberLes
      );
      this.filter.selectedMinRooms = this.setNum(
        this.$route.query.roomsNumberHigher
      );
      this.filter.adType = this.setArray(this.$route.query.adType);
      this.filter.realEstateType = this.setArray(this.$route.query.type);
      this.filter.heatingType = this.setArray(this.$route.query.heatingType);
      this.filter.floors = this.setArray(this.$route.query.floor);
      this.filter.furniture = this.setArray(this.$route.query.furniture);
      this.filter.pictures = Boolean(this.$route.query.hasPictures);
    },
    selectedLocations: function (val, oldVal) {
      if (oldVal != null) {
        this.microLocations = null;
        axios
          .post("http://localhost:9090/refresh-micro-locations", {
            locations: val,
          })
          .then((res) => {
            this.microLocations = res.data.microLocations;
            this.filter.selectedMicroLocations = this.filter.selectedMicroLocations.filter(
              (el) => this.microLocations.includes(el)
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    console.log(this.userId);
    axios
      .get("http://localhost:9090/get-form-props")
      .then((res) => {
        this.locations = res.data.locations;
        this.microLocations = res.data.microLocations;
        this.adTypes = res.data.adTypes;
        this.realEstateTypes = res.data.realEstateTypes;
        this.heatingTypes = res.data.heatingTypes;
        this.floors = res.data.floors;
        this.furnitures = res.data.furnitureTypes;
      })
      .catch((error) => {
        this.notifyVue("top", "center", error.response.data);
      });
  },
  data() {
    return {
      locations: [],
      microLocations: [],
      adTypes: [],
      realEstateTypes: [],
      heatingTypes: [],
      floors: [],
      furnitures: [],
      filter: {
        selectedLocations: this.setArray(this.$route.query.locations),
        selectedMicroLocations: this.setArray(this.$route.query.microLocations),
        selectedMaxPrice: this.setNum(this.$route.query.priceLes),
        selectedMinPrice: this.setNum(this.$route.query.priceHigher),
        selectedMaxArea: this.setNum(this.$route.query.spaceAreaLes),
        selectedMinArea: this.setNum(this.$route.query.spaceAreaHigher),
        selectedMaxRooms: this.setNum(this.$route.query.roomsNumberLes),
        selectedMinRooms: this.setNum(this.$route.query.roomsNumberHigher),
        adType: this.setArray(this.$route.query.adType),
        realEstateType: this.setArray(this.$route.query.type),
        heatingType: this.setArray(this.$route.query.heatingType),
        floors: this.setArray(this.$route.query.floor),
        furniture: this.setArray(this.$route.query.furniture),
        coordinates: null,
        pictures: Boolean(this.$route.query.hasPictures),
        subscribed: false,
      },
    };
  },
  methods: {
    setArray(value) {
      if (Array.isArray(value)) return value;
      if (value != null) return [value];
      return null;
    },
    setNum(value) {
      if (!isNaN(parseFloat(value))) return parseFloat(value);
      return null;
    },
    filtering() {
      this.$router
        .push({
          name: "All Ads",
          params: { id: 1 },
          query: Object.fromEntries(
            Object.entries({
              locations: this.filter.selectedLocations,
              microLocations: this.filter.selectedMicroLocations,
              priceLes: this.filter.selectedMaxPrice,
              priceHigher: this.filter.selectedMinPrice,
              spaceAreaLes: this.filter.selectedMaxArea,
              spaceAreaHigher: this.filter.selectedMinArea,
              roomsNumberLes: this.filter.selectedMaxRooms,
              roomsNumberHigher: this.filter.selectedMinRooms,
              adType: this.filter.adType,
              type: this.filter.realEstateType,
              heatingType: this.filter.heatingType,
              floor: this.filter.floors,
              furniture: this.filter.furniture,
              hasPictures: this.filter.pictures,
            }).filter(([_, v]) => v != null)
          ),
        })
        .catch((err) => {});
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);

      // console.log("coordinates: " + this.filter.coordinates);
    },
    clearFilters(){
      this.filter = {
        selectedLocations: null,
        selectedMicroLocations: null,
        selectedMaxPrice: null,
        selectedMinPrice: null,
        selectedMaxArea: null,
        selectedMinArea: null,
        selectedMaxRooms: null,
        selectedMinRooms: null,
        adType: null,
        realEstateType: null,
        heatingType: null,
        floors: null,
        furniture: null,
        coordinates: null,
        pictures: false,
        subscribed: false,
      }
    }
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