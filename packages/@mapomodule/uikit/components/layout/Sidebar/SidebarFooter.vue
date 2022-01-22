<template>
  <div>
    <v-divider></v-divider>
    <v-list dense class="py-0">
      <SidebarListItem
        v-for="(item, i) in routes"
        :key="i"
        :link="item.link"
        :label="item.label"
        :meta="item.meta"
        :childrens="item.childrens"
        :icon="item.icon"
        :force-collapse="forceCollapse"
      />
    </v-list>
    <v-divider></v-divider>
    <v-list-item dense class="logout__button" link @click.native="logout">
      <v-list-item-icon>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-icon>
      <v-list-item-title> Logout </v-list-item-title>
    </v-list-item>
  </div>
</template>

<style lang="scss" scoped>
.logout__button{
  &.theme--light{
    background: #ffffffd6;
    filter: invert(1);
  }
  &.theme--dark{
      background: #121212;
  }
}
</style>
<script>
import { buildRoutes } from "../routebuilder";

// @vuese
export default {
  name: "SidebarFooter",
  props: {
    forceCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultIcon: ({ label }) => `mdi-alpha-${label[0]}-box`.toLowerCase(),
      routes: this.routes
    };
  },
  mounted() {
    this.routes = this.buildRoutes(
      this.$router.options.routes.filter(
        route => route.meta && route.meta.sidebarFooter === true
      )
    );
  },
  methods: {
    buildRoutes(routes) {
      return buildRoutes(routes, this.defaultIcon);
    },
    logout() {
      this.$store.dispatch("mapo/user/logout");
    }
  }
};
</script>
