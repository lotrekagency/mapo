<template>
  <div v-if="parentFolders && parentFolders.length">
    <span class="mx-2 mt-1 d-flex flex-wrap align-center">
      <span class="mb-1">
        <v-icon @click="getRoot({ folder: null })" small>mdi-home</v-icon></span
      >
      <span class="fpath__button" v-for="(folder, i) in parentFolders" :key="i"
        >/<a @click="getRoot({ folder })">{{ folder.slug }}</a>
      </span>
    </span>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: mapGetters("mapo/media", ["parentFolders"]),
  methods: mapActions("mapo/media", ["getRoot"]),
};
</script>
