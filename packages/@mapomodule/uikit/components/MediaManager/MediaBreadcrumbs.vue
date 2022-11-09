<template>
  <div
    v-if="parentFolders && parentFolders.length"
    class="media-breadcrumbs--wrapper"
  >
    <span class="mx-2 mt-1 d-flex flex-wrap align-center">
      <span class="mb-1">
        <v-icon @click="getRoot({ folder: null })" small>mdi-home</v-icon></span
      >
      <span
        class="media-breadcrumbs--button"
        v-for="(folder, i) in parentFolders"
        :key="i"
        >/<a @click="getRoot({ folder })">{{ folder.slug }}</a>
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.media-breadcrumbs--button {
  padding-left: 7px;
  color: grey;
  a {
    margin-left: 7px;
  }
  &:last-child {
    a {
      color: unset;
      cursor: auto;
      pointer-events: none;
    }
  }
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: mapGetters("mapo/media", ["parentFolders"]),
  methods: mapActions("mapo/media", ["getRoot"]),
};
</script>
