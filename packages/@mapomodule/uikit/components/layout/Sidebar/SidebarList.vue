<template>
  <v-list dense class="py-0 overflow-y-auto">
    <SidebarListItem
      v-for="(item, i) in routes"
      :key="i"
      :link="item.link"
      :label="item.label"
      :meta="item.meta"
      :childrens="item.childrens"
      :icon="item.icon"
      :force-collapse="forceCollapse"
      :spider-menu="spiderMenu"
    />
  </v-list>
</template>

<script>
import { buildRoutes } from "../routebuilder";

// @vuese
export default {
  name: "SidebarList",
  props: {
    footer: Boolean,
    forceCollapse: Boolean,
    spiderMenu: {
      type: Boolean,
      default() { 
        const { spiderMenu } = this.$mapo.$options?.ui?.sidebar || {};
        return spiderMenu == undefined ? true : spiderMenu;
      }
    }
  },
  data() {
    return {
      defaultIcon: ({label}) => `mdi-alpha-${label[0]}-box-${ this.footer ? '' : 'outline'}`.toLowerCase(),
      routes: this.routes,
    };
  },
  mounted() {
    this.routes = this.buildRoutes(this.$router.options.routes.filter(({ meta }) => !!meta?.sidebarFooter == this.footer));
  },
  methods: {
    buildRoutes(routes) {
      return buildRoutes(routes, this.defaultIcon)
    },
  },
};
</script>
