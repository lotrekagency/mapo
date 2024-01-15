<template>
  <div>
    <div ref="map" class="map"></div>
    <div class="map-fields">
      <div class="row search-row">
        <div class="col-sm-12" style="padding: 0px">
          <v-text-field
            v-model="searchQuery"
            :label="$t('mapo.searchLocation')"
            @input="debouncedSearchLocation()"
            v-bind="{ ...$attrs }"
            class="col"
          />
        </div>
      </div>
      <div class="row input-gap" v-for="(point, index) in model" :key="index">
        <div class="col-sm-6">
          <div class="row">
            <v-text-field
              v-model="point.pointName"
              :label="$t('mapo.pointName')"
              v-bind="{ ...$attrs }"
              ref="pointName"
            />
          </div>
        </div>
        <div class="col">
          <div class="row">
            <v-text-field
              v-model="point.lat"
              :label="$t('mapo.latitude')"
              v-bind="{ ...$attrs }"
              readonly
              class="col-5"
            />
            <v-text-field
              v-model="point.lon"
              :label="$t('mapo.longitude')"
              v-bind="{ ...$attrs }"
              readonly
              class="col-5"
            />
            <v-btn
              v-if="!readonly"
              @click="removePointFromModel(index)"
              class="col"
              icon
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.map {
  height: 400px;
  width: 100%;
}
.map-fields {
  margin-top: 10px;
  max-width: 100%;
  padding: 12px;
}
.input-gap {
  gap: 8px;
}
.search-row {
  margin-bottom: 10px;
  & > div {
    padding: 0 !important;
  }
}
</style>

<script>
/**
 * This component is made to get coordinates from a map.
 */
import { debounce } from "@mapomodule/utils/helpers/debounce";
import injectScript from "./leaflet.injector.js";

export default {
  name: "MapField",
  props: {
    // V-model property.
    value: {
      type: Array,
    },
    // This set the component status to readonly, stopping the user interaction.
    readonly: {
      type: Boolean,
      default: false,
    },
    // This set the component status to multiple, allowing the user to add multiple points. Pass it into attrs
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      model: this.value || [],
      map: null,
      searchQuery: "",
      markers: [],
    };
  },
  watch: {
    value(val) {
      this.model = val || [];
    },
    model(val) {
      this.$emit("input", val);
    },
  },
  mounted() {
    injectScript().then(this.initMap);
  },
  methods: {
    initMap() {
      const coordinates = this.model || [];
      if (coordinates.length > 0) {
        const { lat, lon } = coordinates[coordinates.length - 1];
        this.map = L.map(this.$refs.map).setView([lat, lon], 12);
        coordinates.forEach((point, index) => {
          const marker = L.marker([point.lat, point.lon]).addTo(this.map);
          this.markers[index] = marker;
        });
        this.map.fitBounds(coordinates.map((point) => [point.lat, point.lon]));
      } else {
        this.map = L.map(this.$refs.map).setView([0, 0], 2);
      }
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map);
      this.handleClickOnMap();
    },
    handleClickOnMap() {
      this.map.on("click", async (event) => {
        const coordinates = event.latlng;

        if (!this.multiple) {
          this.removeAllMarkers();
          this.model = [];
        }

        this.model.push({
          lat: coordinates.lat,
          lon: coordinates.lng,
          pointName: "",
        });

        const marker = L.marker([coordinates.lat, coordinates.lng]).addTo(
          this.map
        );
        this.markers.push(marker);
        await this.reverseGeoCoding(coordinates.lat, coordinates.lng);
      });
    },
    removeAllMarkers() {
      this.markers.forEach((marker) => this.map.removeLayer(marker));
      this.markers = [];
    },
    async reverseGeoCoding(lat, lon) {
      const reverseGeocodingResponse = await this.$axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat,
            lon,
            format: "json",
            addressdetails: 1,
            "accept-language": this.$attrs.currentLang || "en",
          },
        }
      );

      if (
        reverseGeocodingResponse.data &&
        reverseGeocodingResponse.data.display_name
      ) {
        this.model[this.currentIndex].pointName =
          reverseGeocodingResponse.data.display_name;
      } else {
        this.model[this.currentIndex].pointName = this.searchQuery;
      }
    },
    removePointFromModel(index) {
      this.map.removeLayer(this.markers[index]);
      this.markers.splice(index, 1);
      this.model.splice(index, 1);

      if (this.model.length > 0) {
        this.map.fitBounds(this.model.map((point) => [point.lat, point.lon]));
      } else {
        this.map.setView([0, 0], 2);
      }
    },
    async searchLocation() {
      try {
        const response = await this.$axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: this.searchQuery,
              format: "json",
              limit: 1,
            },
          }
        );

        if (response.data.length > 0) {
          if (!this.multiple) {
            this.removeAllMarkers();
            this.model = [];
          }
          const { lat, lon } = response.data[0];
          this.map.setView([lat, lon], 12);

          const marker = L.marker([lat, lon]).addTo(this.map);
          this.markers.push(marker);

          this.model.push({
            lat,
            lon,
            pointName: this.searchQuery,
          });

          await this.reverseGeoCoding(lat, lon);
          this.map.fitBounds(this.model.map((point) => [point.lat, point.lon]));
        }
      } catch (error) {
        console.error(`${this.$t("mapo.error.searchError")}: `, error);
      }
    },
    debouncedSearchLocation: debounce(function () {
      this.searchLocation();
    }, 500),
  },
  computed: {
    lat() {
      return this.model?.lat || "";
    },
    lon() {
      return this.model?.lon || "";
    },
    pointName() {
      return this.model?.pointName || "";
    },
    currentIndex() {
      return this.model.length > 0 ? this.model.length - 1 : 0;
    },
  },
};
</script>
