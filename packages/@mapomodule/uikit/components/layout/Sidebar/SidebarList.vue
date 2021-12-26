<template>
  <v-list dense class="py-0 overflow-y-auto">
    <SidebarListItem
      v-for="(item, i) in routes"
      :key="i"
      :link="item.link"
      :label="item.label"
      :childrens="item.childrens"
      :icon="item.icon"
    />
  </v-list>
</template>

<script>
import { buildRoutes } from "../routebuilder";

// @vuese
export default {
  name: "SidebarList",
  data() {
    return {
      defaultIcon: ({label}) => `mdi-alpha-${label[0]}-circle`.toLowerCase(),
      routes: this.routes,
    };
  },
  mounted: function () {
    this.routes = this.buildRoutes(this.$router.options.routes.filter(route => !route.meta || !route.meta.sidebarFooter));
  },
  methods: {
    buildRoutes(routes) {
      return buildRoutes(routes, this.defaultIcon)
    },
  },
};
</script>
