<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <ad-card
          v-for="ad in ads"
          :key="ad.title"
          :title="ad.title"
          :content="ad.content"
          :img-url="ad.imgUrl"
          :date="ad.date"
          :phone="ad.phone"
          :space="ad.space"
          :rooms="ad.rooms"
          :furniture="ad.furniture"
        ></ad-card>
      </div>
    </div>
    <div class="pagination-holder">
      <pagination type="info" v-model="infoPagination" :page-count="3">
      </pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "./../components/Pagination";
import AdCard from "../components/Cards/AdCard.vue";
export default {
  components: {
    Pagination,
    AdCard,
  },
  data() {
    return {
      ads: [
        {
          title: "Novi Beograd, Blok 28,Milutina Milankovića 57",
          content:
            "Savski venac, Dedinje-Beli dvor, Velisava Vulovića 144m2 4.0, 144m2, 1/2, EG, terasa x2, parking, podrum, interfon, telefon U prilici smo da vam ponudimo stan u izgradnji na ekskluzivnoj",
          imgUrl:
            "https://img.halooglasi.com//slike/oglasi/Thumbs/200802/m/prodaja-luksuznog-stana-na-vracaru-5425635800461-71792244221.jpg",
          date: "18-06-2020",
          phone: "123 456 789",
          space: "36,18",
          rooms: "1.5",
          furniture: true,
        },
        {
          title: "Novi Beograd, Blok 28,Milutina Milankovića 27",
          content:
            "Novi Beograd, Dedinje-Beli dvor, Velisava Vulovića 144m2 4.0, 144m2, 1/2, EG, terasa x2, parking, podrum, interfon, telefon U prilici smo da vam ponudimo stan u izgradnji na ekskluzivnoj",
          imgUrl:
            "https://img.halooglasi.com//slike/oglasi/Thumbs/200308/m/vracar-sumatovacka-prodaja-lux-stanova-izgrad-5425635286073-71790906402.jpg",
          date: "13-06-2020",
          phone: "023 456 789",
          space: "143,18",
          rooms: "5+",
          furniture: false,
        },
      ],
      infoPagination: 2,
    };
  },
  created() {},
};
</script>
