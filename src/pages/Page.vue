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
          @click.native="openDtails(ad.id)"
           ref="childComponent"
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

export default {
  components: {
    Pagination,
    AdCard,
  },
  watch: {
    $route(to, from) {
      this.getData(to.params.id);
    },
  },
  data() {
    return {
      ads: null,
      infoPagination: parseInt(this.$route.params.id),
      pageCount: 1,
    };
  },
  created() {
    this.getData(this.infoPagination);
  },
  methods: {
    openDetails(id) {
     this.$refs.childComponent[id-1].openDetails(id);
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
    getData(page) {
      axios
        .post("http://localhost:9090/page", {
          filters: null,
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
