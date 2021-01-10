<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<style>
.ol-attribution.ol-uncollapsible {
  visibility: hidden;
}
</style>

<script>
import "ol/ol.css";
import Draw from "ol/interaction/Draw";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useGeographic } from "ol/proj";

export default {
  name: "MapContainer",
  components: {},
  props: {
    geojson: Object,
  },
  data: () => ({
    raster: null,
    source: null,
    vector: null,
    map: null,
    draw: null,
    coordinates: null,
  }),
  mounted() {
    useGeographic();
    this.source = new VectorSource({ wrapX: false });

    this.raster = new TileLayer({
      source: new OSM(),
    });

    this.vector = new VectorLayer({
      source: this.source,
    });

    this.map = new Map({
      layers: [this.raster, this.vector],
      target: "map",
      view: new View({
        center: [20.457273, 44.787197],
        zoom: 13,
      }),
    });

    this.draw = new Draw({
      source: this.source,
      type: "Polygon",
    });

    this.map.addInteraction(this.draw);

    this.draw.on("drawstart", this.clear);
  },
  methods: {
    clear() {
      this.map.getLayers().getArray()[1].getSource().clear();
    },

    read() {
      let feature = this.vector.getSource().getFeatures()[0];
      if (feature != null) {
        this.coordinates = feature.getGeometry().getCoordinates()[0];
        this.$emit("coordinates", JSON.stringify(this.coordinates));
      } else {
        console.log("ERROR");
      }
    },
    undo() {
      this.draw.removeLastPoint();
    },
  },
};
</script>
