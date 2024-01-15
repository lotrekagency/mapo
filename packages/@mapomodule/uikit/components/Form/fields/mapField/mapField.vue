<template>
  <div>
    <div ref="map" class="map"></div>
    <div class="map-fields">
      <div class="row input-gap">
        <div class="col-sm-12">
          <div class="row">
            <v-text-field
              v-model="searchQuery"
              :label="$t('mapo.searchLocation')"
              @input="debouncedSearchLocation()"
              v-bind="{ ...$attrs }"
              class="col"
            />
          </div>
        </div>
        <div class="col-sm-7">
          <div class="row">
            <v-text-field
              v-model="model.pointName"
              :label="$t('mapo.pointName')"
              v-bind="{ ...$attrs }"
              ref="pointName"
            />
          </div>
        </div>
        <div class="col">
          <div class="row input-gap">
            <v-text-field
              v-model="lat"
              :label="$t('mapo.latitude')"
              v-bind="{ ...$attrs }"
              readonly
              class="col-6"
            />
            <v-text-field
              v-model="lon"
              :label="$t('mapo.longitude')"
              v-bind="{ ...$attrs }"
              readonly
              class="col"
            />
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
      type: Object,
    },
    // This set the component status to readonly, stopping the user interaction.
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      model: this.value || {},
      map: null,
      searchQuery: "",
      marker: null,
    };
  },
  watch: {
    value(val) {
      this.model = val || {};
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
      const coordinates = this.model;
      if (coordinates.lat && coordinates.lon) {
        this.map = L.map(this.$refs.map).setView(
          [coordinates.lat, coordinates.lon],
          12
        );
        this.removeAllMarkers();
        this.marker = L.marker([coordinates.lat, coordinates.lon]).addTo(
          this.map
        );
      } else {
        this.map = L.map(this.$refs.map).setView([0, 0], 2);
      }

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map);

      this.map.on("click", (event) => {
        const coordinates = event.latlng;
        this.model = { lat: coordinates.lat, lon: coordinates.lng, pointName: "" };
        this.removeAllMarkers();
        this.marker = L.marker([coordinates.lat, coordinates.lng]).addTo(
          this.map
        );
        this.reverseGeoCoding(coordinates.lat, coordinates.lng);
      });
    },
    removeAllMarkers() {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
    },
    async reverseGeoCoding(lat, lon){
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
            this.model.pointName = reverseGeocodingResponse.data.display_name;
          } else {
            this.model.pointName = this.searchQuery;
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
          const { lat, lon } = response.data[0];
          this.map.setView([lat, lon], 12);

          if (this.marker) {
            this.map.removeLayer(this.marker);
          }
          this.removeAllMarkers();
          this.marker = L.marker([lat, lon]).addTo(this.map);
          this.model = { lat, lon, pointName: "" };
          this.reverseGeoCoding(lat, lon);
        }
      } catch (error) {
        console.error(`${this.$t('mapo.error.searchError')}: `, error);
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
  },
};
</script>
