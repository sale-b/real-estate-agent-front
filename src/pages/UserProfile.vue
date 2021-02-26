<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div>
      <div class="md-layout">
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
      <a
          v-for="(ad, index) in ads"
          :key="index"
          :href="generateUrl(ad.id)"
          v-on:click.prevent="$refs.adDetails[index].openDetails(ad.id)"
        >
          <ad-card
            :tittle="ad.tittle"
            :content="ad.description"
            :img-url="ad.img_url"
            :date="getFormattedDate(ad.created_on)"
            :phone="ad.phone"
            :space="ad.living_space_area"
            :rooms="ad.rooms_number"
            :furniture="ad.furniture"
            :price="ad.price"
            :id="ad.id"
            ref="adDetails"
          ></ad-card>
        </a>
          <div class="pagination-holder">
            <pagination
              type="info"
              v-if="pageCount > 1"
              v-on:input="change"
              v-model="infoPagination"
              :page-count="pageCount"
            >
            </pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserCard } from "@/pages";
import Pagination from "./../components/Pagination";
import AdCard from "../components/Cards/AdCard";
import EventBus from "./../event-bus";
import axios from "axios";

export default {
  components: {
    UserCard,
    Pagination,
    AdCard,
  },
  data() {
    return {
      ads: null,
      infoPagination: parseInt(1),
      pageCount: 1,
      filter: null,
    };
  },
  mounted() {
    EventBus.$on("filterSelected", (filter) => {
      this.filter = filter;
      axios
        .post("http://localhost:9090/page", {
          filters: Object.fromEntries(
            Object.entries({
              locations: this.filter.selectedLocations,
              microLocations: this.filter.selectedMicroLocations,
              priceLes: this.setNum(this.filter.selectedMaxPrice),
              priceHigher: this.setNum(this.filter.selectedMinPrice),
              spaceAreaLes: this.setNum(this.filter.selectedMaxArea),
              spaceAreaHigher: this.setNum(this.filter.selectedMinArea),
              roomsNumberLes: this.setNum(this.filter.selectedMaxRooms),
              roomsNumberHigher: this.setNum(this.filter.selectedMinRooms),
              adType: this.filter.adType,
              type: this.filter.realEstateType,
              heatingType: this.filter.heatingType,
              floor: this.filter.floors,
              furniture: this.filter.furniture,
              hasPictures: this.bool(this.filter.pictures),
              coordinates: this.setCoordinates(this.filter.coordinates),
            }).filter(([_, v]) => v != null)
          ),
          page: 1,
        })
        .then((res) => {
          this.ads = res.data.ads;
          this.infoPagination = res.data.pagination.currentPage;
          this.pageCount = res.data.pagination.totalPages;
          this.scrollToTop();
        })
        .catch((error) => {
          this.notifyVue("top", "center", error.response.data.message);
        });
    });
  },
  methods: {
      generateUrl(id) {
      return "/ad/" + id.toString();
    },
    bool(val) {
      if (val == true || val == "true") return true;
      return false;
    },
    setCoordinates(value) {
      if (value != null) {
        let rearanged = [];
        if (value[0].constructor === String) {
          for (let i = 0; i < value.length; i++) {
            rearanged.push(value[i].split(",").map(Number));
          }
          return rearanged;
        } else {
          return value;
        }
      } else {
        return null;
      }
    },
    setArray(value) {
      if (Array.isArray(value)) return value;
      if (value != null) return [value];
      return null;
    },
    setNum(value) {
      if (!isNaN(parseFloat(value))) return parseFloat(value);
      return null;
    },
    change() {
      axios
        .post("http://localhost:9090/page", {
          filters: Object.fromEntries(
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
              hasPictures: this.bool(this.filter.pictures),
              coordinates: this.setCoordinates(this.filter.coordinates),
            }).filter(([_, v]) => v != null)
          ),
          page: this.infoPagination,
        })
        .then((res) => {
          this.ads = res.data.ads;
          this.infoPagination = res.data.pagination.currentPage;
          this.pageCount = res.data.pagination.totalPages;
          this.scrollToTop();
        })
        .catch((error) => {
          this.notifyVue("top", "center", error.response.data.message);
        });
    },
    openDetails(id) {
      this.$refs.adDetails[id - 1].openDetails(id);
    },
    getFormattedDate(string) {
      var date = new Date(string);
      let year = date.getFullYear();
      let month = (1 + date.getMonth()).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");

      return month + "/" + day + "/" + year;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    logout() {
      this.removeId();
      this.removeAuthToken();
      this.$router.push({ name: "Login Register" });
    },
  },
};
</script>
