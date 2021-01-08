<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Select area</md-dialog-title>

      <div class="cell">
        <map-container
          v-on:coordinates="finishSelectingArea"
          ref="map"
        ></map-container>
      </div>

      <md-dialog-actions>
        <md-button class="md-info" @click="showDialog = false">Close</md-button>
        <md-button class="md-info" @click="undo">Undo</md-button>
        <md-button class="md-info" @click="read">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-card @click.native="openDialog" class="map-button" md-with-hover>
      <img src="@/assets/img/pretraga_na_mapi.jpg" alt="Map search" />
    </md-card>
  </div>
</template>

<script>
import MapContainer from "./MapContainer";

export default {
  name: "DialogMap",
  components: {
    MapContainer,
  },
  methods: {
    finishSelectingArea(value) {
      this.$emit("coordinates", value);
      this.showDialog = false;
    },
    read() {
      this.$refs.map.read();
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    undo() {
      this.$refs.map.undo();
    },
    openDialog() {
      this.showDialog = true;
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
  },
  data: () => ({
    showDialog: false,
  }),
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}

.md-dialog {
  width: 90%;
  height: 100%;
}

.cell {
  height: 100%;
}

.map-button {
  margin: 0;
}
</style>
