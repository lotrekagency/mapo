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
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
    background-color: var(--v-scrollbar-track-color);
}
::-webkit-scrollbar-thumb {
  background-color: var(--v-primary-base);
}
</style>

<script>
import initDraggable from "@mapomodule/utils/plugins/v-draggable-modals";
import { setScrollbarTrackColor } from "@mapomodule/utils/helpers/cssVariables"
export default {
  mounted() {
    initDraggable();
    setScrollbarTrackColor(this.$vuetify.theme.dark)
  },
  watch: { "$vuetify.theme.dark": setScrollbarTrackColor }
};
</script>