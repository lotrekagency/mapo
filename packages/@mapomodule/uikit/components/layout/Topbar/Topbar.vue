<template>
  <v-app-bar
    :clipped-left="this.$store.getters['mapo/app/clipped']"
    fixed
    app
    flat
    dense
  >
    <component v-if="componentExists('MapoTopBarLeftSlot')" :is="'MapoTopBarLeftSlot'" />
    <component v-if="componentExists('MapoTopBarToggleIconSlot')" :is="'MapoTopBarToggleIconSlot'" :toggleSidebarDrawer="toggleSidebarDrawer" />
    <v-app-bar-nav-icon v-else @click.stop="toggleSidebarDrawer" />
    <component v-if="componentExists('MapoTopBarTitleSlot')" :is="'MapoTopBarTitleSlot'"/>
    <v-spacer></v-spacer>
    <component v-if="componentExists('MapoTopBarRightSlot')" :is="'MapoTopBarRightSlot'"/>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "Topbar",
  methods: {
    ...mapActions("mapo/app", ["toggleSidebarDrawer"]),
    componentExists(name){
      return name in this.$options.components;
    }
  },
};
</script>
