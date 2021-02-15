<template>
  <div class="sidebar__list">
    <sidebar-list-item
      class="sidebar__list__item"
      v-for="(item, i) in routes"
      :key="i"
      :link="item.link"
      :label="$t(item.label)"
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
  data() {
    return {
      defaultIcon: "mdi-chevron-right",
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
