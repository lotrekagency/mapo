<template>
  <v-app>
    <nuxt />
    <root-components />
  </v-app>
</template>


<script>
import initDraggable from "@mapomodule/utils/plugins/v-draggable-modals";
export default {
  mounted() {
    initDraggable();
  },
};
</script>