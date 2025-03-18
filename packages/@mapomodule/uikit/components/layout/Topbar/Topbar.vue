<template>
  <!-- <v-app-bar
    :clipped-left="this.$store.getters['mapo/app/clipped']"
    fixed
    app
    flat
    dense
  > -->
  <v-app-bar
    :clipped-left="false"
    fixed
    app
    flat
    dense
  >
    <component v-if="componentExists('MapoTopBarLeftSlot')" :is="'MapoTopBarLeftSlot'" />
    <!-- <component v-if="componentExists('MapoTopBarToggleIconSlot')" :is="'MapoTopBarToggleIconSlot'" :toggleSidebarDrawer="toggleSidebarDrawer" /> -->
    <component v-if="componentExists('MapoTopBarToggleIconSlot')" :is="'MapoTopBarToggleIconSlot'" />
    <!-- <v-app-bar-nav-icon v-else @click.stop="toggleSidebarDrawer" /> -->
    <component v-if="componentExists('MapoTopBarTitleSlot')" :is="'MapoTopBarTitleSlot'"/>
    <v-spacer></v-spacer>
    <component v-if="componentExists('MapoTopBarRightSlot')" :is="'MapoTopBarRightSlot'"/>
  </v-app-bar>
</template>

<script>
// import { mapActions } from 'vuex';
import { getCurrentInstance } from 'vue';

export default {
  name: "Topbar",
  methods: {
    // ...mapActions("mapo/app", ["toggleSidebarDrawer"]),
    componentExists(name){
      // return name in this.$options.components;
      // TODO: check if is the correct way to check if a component exists
      return name in getCurrentInstance()?.appContext.components;
    }
  },
};
</script>
