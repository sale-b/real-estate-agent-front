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
          <ad-card
            v-for="ad in ads"
            :key="ad.id"
            :title="ad.id"
            :content="ad.description"
            :img-url="ad.img_url"
            :date="getFormattedDate(ad.created_on)"
            :phone="ad.phone"
            :space="ad.living_space_area"
            :rooms="ad.rooms_number"
            :furniture="ad.furniture"
          ></ad-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserCard } from "@/pages";
import AdCard from "../components/Cards/AdCard";
import axios from "axios";

export default {
  components: {
    UserCard,
    AdCard,
  },
  data() {
    return {
      ads: null,
    };
  },
  created() {
    axios
      .post("http://localhost:9090/page", {
          filters: null,
          page: 1,
        })
        .then((res) => {
          this.ads = res.data.ads;
          // this.infoPagination = res.data.pagination.currentPage;
          // this.pageCount = res.data.pagination.totalPages;
          this.scrollToTop();
        })
      .catch((error) => {
        this.notifyVue("top", "center", error.response.data);
      });
  },
  methods: {
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
