<template>
  <stats-card data-background-color="green">
    <template slot="header">
      <img class="ad-pic" :src="imgUrl" alt="Apartment img" />
    </template>

    <template slot="content">
      <h4
        v-on:click.prevent="$router.push('/ad/' + id).catch((err) => {})"
        class="category"
      >
        {{ tittle }}
      </h4>
      <br />
      <p class="tittle">
        {{ content }}
      </p>
    </template>

    <template slot="footer">
      <div>
        <div class="stats" style="padding: 3px 10px 0px 0px">
          <md-icon>date_range</md-icon>
          {{ date }}
        </div>

        <div class="stats" style="padding: 3px 10px 0px 0px">
          <md-icon>perm_phone_msg</md-icon>
          <a :href="'tel:' + phone">{{ phone }}</a>
        </div>

        <div class="stats" style="padding: 0px 10px 0px 0px">
          <div>Living space area:</div>
          {{ space }} m<sup>2</sup>
        </div>
      </div>
      <div>
        <div class="stats" style="padding: 3px 10px 0px 0px">
          <div>Rooms number:</div>
          {{ rooms }}
        </div>

        <div class="stats" style="padding: 0px 10px 0px 0px">
          <div>Furniture:</div>
          {{ furniture ? "Provided" : "Not provided" }}
        </div>
      </div>
    </template>
  </stats-card>
</template>

<script>
import StatsCard from "./StatsCard";

export default {
  components: {
    StatsCard,
  },
  props: [
    "id",
    "tittle",
    "content",
    "imgUrl",
    "date",
    "phone",
    "space",
    "rooms",
    "furniture",
  ],
};
</script>


<style>
.pagination li {
  display: inline-block;
}

.pagination {
  padding-left: 0px;
  text-align: center;
}

a.page-link {
  font-size: 30px !important;
}

.pagination-holder {
  margin: auto;
}

a:hover,
a:focus {
  color: #0b63ac !important;
  cursor: pointer;
}

.md-card-header > img {
  margin: 0 !important;
  border-radius: 0 !important;
}

.img-head {
  padding: 0 !important;
}

.md-card-stats .md-card-content {
  text-align: left !important;
}
</style>

<style scoped>
img.ad-pic {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

h4:hover {
  color: rgb(24, 42, 204) !important;
  cursor: pointer;
}
</style>
