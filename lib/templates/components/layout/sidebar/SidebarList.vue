<template>
  <div class="sidebar__list">
    <SidebarListItem
      class="sidebar__list__item"
      v-for="(item, i) in routes"
      :key="i"
      :link="item.link"
      :label="item.label"
      :childrens="item.childrens"
      :icon="item.icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  &__list {
    display: flex;
    flex-direction: column;
  }
}
</style>

<script>
import { buildRoutes } from "~mapomodule/utils/routebuilder"
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
