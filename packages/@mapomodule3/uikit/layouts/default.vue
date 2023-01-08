<template>
  <v-app>
    <Sidebar />
    <Topbar />
    <v-main>
      <nuxt />
      <root-components />
    </v-main>
  </v-app>
</template>

<style lang="scss">
html { overflow-y: auto }
.v-main__wrap {
  .__nuxt-error-page {
    background: transparent;
    .error {
      background: transparent !important;
      svg {
        // fill: #ff5252 !important;
      }
    }
  }
}
</style>

<script>
import initDraggable from "@mapomodule/utils/plugins/v-draggable-modals";
export default {
  mounted() {
    initDraggable();
  },
};
</script>