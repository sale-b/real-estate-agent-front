<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <ad-card
          v-for="ad in ads"
          :key="ad.id"
          :tittle="ad.tittle"
          :content="ad.description"
          :img-url="ad.img_url"
          :date="getFormattedDate(ad.created_on)"
          :phone="ad.phone"
          :space="ad.living_space_area"
          :rooms="ad.rooms_number"
          :furniture="ad.furniture"
          :id="ad.id"
          @click.native="openDetails(ad.id)"
          ref="adDetails"
        ></ad-card>
      </div>
    </div>
    <div class="pagination-holder">
      <pagination
        type="info"
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
import Vue from "vue";
import EventBus from "./../event-bus";


export default {
  components: {
    Pagination,
    AdCard,
  },
  watch: {
    $route(to, from) {
      this.fetchData(to.params.id, null);
    },
  },
  data() {
    return {
      ads: null,
      infoPagination: parseInt(this.$route.params.id),
      pageCount: 1,
    };
  },
  mounted() {
    this.fetchData(this.infoPagination, null);
    EventBus.$on("filterApplied", (filter) => {
       this.fetchData(this.infoPagination, 
       {
         microLocation: filter.selectedMicroLocations
         });
    });
  },
  methods: {
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
    notifyVue(verticalAlign, horizontalAlign, message) {
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger",
      });
    },
    change(page) {
      this.$router.push(this.infoPagination.toString()).catch((err) => {});
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
          this.notifyVue("top", "center", error.response.data);
        });
    },
  },
};
</script>
