<template>
  <div class="content">
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
            :location="ad.location"
            :space="ad.living_space_area"
            :rooms="ad.rooms_number"
            :furniture="ad.furniture"
            :price="ad.price"
            :floor="ad.floor"
            :id="ad.id"
            ref="adDetails"
          ></ad-card>
        </a>
      </div>
    </div>
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
</template>

<script>
import Pagination from "./../components/Pagination";
import AdCard from "../components/Cards/AdCard.vue";
import axios from "axios";

export default {
  components: {
    Pagination,
    AdCard,
  },
  watch: {
    $route(to, from) {
      this.fetchData(parseInt(to.params.id), {
        location: this.set(this.$route.query.locations),
        microLocation: this.set(this.$route.query.microLocations),
        priceLes: parseFloat(this.$route.query.priceLes),
        priceHigher: parseFloat(this.$route.query.priceHigher),
        spaceAreaLes: parseFloat(this.$route.query.spaceAreaLes),
        spaceAreaHigher: parseFloat(this.$route.query.spaceAreaHigher),
        roomsNumberLes: parseFloat(this.$route.query.roomsNumberLes),
        roomsNumberHigher: parseFloat(this.$route.query.roomsNumberHigher),
        type: this.set(this.$route.query.type),
        adType: this.set(this.$route.query.adType),
        heatingType: this.set(this.$route.query.heatingType),
        floor: this.set(this.$route.query.floor),
        furniture: this.set(this.$route.query.furniture),
        hasPictures: this.bool(this.$route.query.hasPictures),
        coordinates: this.setCoordinates(this.$route.query.coordinates),
      });
    },
  },
  data() {
    return {
      ads: null,
      infoFilters: {
        location: this.set(this.$route.query.locations),
        microLocation: this.set(this.$route.query.microLocations),
        priceLes: parseFloat(this.$route.query.priceLes),
        priceHigher: parseFloat(this.$route.query.priceHigher),
        spaceAreaLes: parseFloat(this.$route.query.spaceAreaLes),
        spaceAreaHigher: parseFloat(this.$route.query.spaceAreaHigher),
        roomsNumberLes: parseFloat(this.$route.query.roomsNumberLes),
        roomsNumberHigher: parseFloat(this.$route.query.roomsNumberHigher),
        type: this.set(this.$route.query.type),
        adType: this.set(this.$route.query.adType),
        heatingType: this.set(this.$route.query.heatingType),
        floor: this.set(this.$route.query.floor),
        furniture: this.set(this.$route.query.furniture),
        hasPictures: this.bool(this.$route.query.hasPictures),
        coordinates: this.setCoordinates(this.$route.query.coordinates),
      },
      infoPagination: parseInt(this.$route.params.id),
      pageCount: 1,
    };
  },
  mounted() {
    this.fetchData(this.infoPagination, this.infoFilters);
  },
  methods: {
    bool(val) {
      if (val == true || val == "true") return true;
      return false;
    },
    set(value) {
      if (Array.isArray(value)) return value;
      if (value != null) return [value];
      return null;
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
    openDetails(index, id) {
      this.$refs.adDetails[index].openDetails(id);
    },
    generateUrl(id) {
      return "/ad/" + id.toString();
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
    notifyVue(verticalAlign, horizontalAlign, message) {
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger",
      });
    },
    change() {
      this.$router
        .push({
          name: "All Ads",
          params: { id: this.infoPagination.toString() },
          query: this.$route.query,
        })
        .catch((err) => {});
    },
    fetchData(page, filters) {
      axios
        .post("http://localhost:9090/page", {
          filters: filters,
          page: page,
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
  },
};
</script>
