<template>
  <div class="sidebar__ender">
    <sidebar-list-item
      class="sidebar__ender__item"
      v-for="(item, i) in routes"
      :key="i"
      :link="item.link"
      :label="item.label"
      :childrens="item.childrens"
      :icon="item.icon"
    />
    <logout-button class="sidebar__ender__item sidebar__ender__item--logout" />
  </div>
</template>

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";

.sidebar {
  &__ender {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    &__icon {
      font-size: 1rem;
      margin-right: 0.5rem;
    }
    &__item {
      display: block;
      width: 100%;
      text-decoration: none;
      color: white;
      background: $b-2;
      transition: all linear 0.25s;
      border-radius: 0;
      &:hover {
        background: rgba($b-2, 0.25);
      }
      &--logout {
        background: $black !important;
        &:hover {
          background: rgba($black, 0.25) !important;
        }
      }
    }
  }
}
</style>

<script>
import { buildRoutes } from "~mapomodule/utils/routebuilder";
export default {
  data() {
    return {
      defaultIcon: "mdi-chevron-right",
      routes: this.routes,
    };
  },
  mounted: function () {
    this.routes = this.buildRoutes(
      this.$router.options.routes.filter(
        (route) => route.meta && route.meta.sidebarFooter === true
      )
    );
  },
  methods: {
    buildRoutes(routes) {
      return buildRoutes(routes, this.defaultIcon);
    },
  },
};
</script>
