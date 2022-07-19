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
    <div class="d-flex">
      <v-list-item dense class="darker__item" link @click.native="login">
        <v-list-item-icon>
          <v-icon v-if="$mapo.$auth.user.isLoggedIn">mdi-logout</v-icon>
          <v-icon v-else>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{
          $mapo.$auth.user.isLoggedIn ? $t("logout") : $t("login")
        }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        dense
        link
        v-if="$i18n.locales.length > 1"
        class="lang__selector darker__item"
      >
        <v-select
          :items="$i18n.locales"
          :value="$i18n.locale"
          @input="$i18n.setLocale($event)"
          dense
          flat
          hide-details
          solo
          background-color="transparent"
          item-value="code"
        >
          <template v-slot:selection="{ item }">
            {{ item.iso ? getFlag(item.iso) : item.name }}
          </template>
          <template v-slot:item="{ item, on, attrs }">
            <v-list-item v-on="on" v-bind="attrs">
              <v-list-item-icon class="mr-2">
                {{ item.iso ? getFlag(item.iso) : item.name }}
              </v-list-item-icon>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
      </v-list-item>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.darker__item {
  &.theme--light {
    background: #ffffffd6;
    filter: invert(1);
  }
  &.theme--dark {
    background: #121212;
  }
}
.lang__selector {
  max-width: 70px;
  overflow: hidden;
  padding: 0;
  v-select {
    border-radius: 0px;
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
      default: false,
    },
  },
  data() {
    return {
      defaultIcon: ({ label }) => `mdi-alpha-${label[0]}-box`.toLowerCase(),
      routes: this.routes,
    };
  },
  mounted() {
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
    login() {
      this.$mapo.$auth.user.isLoggedIn
        ? this.$store.dispatch("mapo/user/logout")
        : this.$router.push("/login");
    },
    getFlag(isoCode) {
      const codePoints = isoCode
        .split("-")
        .slice(-1)[0]
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    },
  },
};
</script>
