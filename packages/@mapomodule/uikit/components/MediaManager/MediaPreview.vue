<template>
  <v-img
    :src="(media.is_image && media.file) || null"
    :lazy-src="(media.is_image && media.thumbnail) || null"
    aspect-ratio="1"
    class="grey lighten-2"
    :class="{ selected }"
    v-bind="$attrs"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          v-if="media.is_image"
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
        <div
          class="
            d-flex
            flex-column
            align-center
            justify-space-between
            fill-height
          "
          style="width: 100%"
          v-else
        >
          <div></div>
          <v-icon :size="size" color="grey">mdi-file</v-icon>
          <span
            class="grey--text text--darken-3 text-truncate pl-1 pr-8"
            style="width: 100%"
            >{{ filename && name || undefined }}</span
          >
        </div>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    media: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Boolean,
      default: false,
    },
    filename: {
      type: Boolean,
      default: false,
    },
    iconSize: {
        type: String || Number,
        default: '70px'
    }
  },
  computed: {
    name() {
      return this.media && this.media.file && this.media.file.split("/").pop();
    },
    size(){
        return this.iconSize && (typeof this.iconSize == 'string' ? this.iconSize : this.iconSize + 'px') || '70px'
    }
  },
};
</script>
