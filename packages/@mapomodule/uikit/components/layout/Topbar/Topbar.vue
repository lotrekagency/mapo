<template>
  <v-app-bar
    :clipped-left="appStore.get_clipped"
    fixed
    app
    flat
    dense
  >
    <component v-if="componentExists('MapoTopBarLeftSlot')" :is="'MapoTopBarLeftSlot'" />
    <component v-if="componentExists('MapoTopBarToggleIconSlot')" :is="'MapoTopBarToggleIconSlot'" :toggleSidebarDrawer="appStore.toggleSidebarDrawer" />
    <component v-if="componentExists('MapoTopBarToggleIconSlot')" :is="'MapoTopBarToggleIconSlot'" />
    <v-app-bar-nav-icon v-else @click.stop="appStore.toggleSidebarDrawer" />
    <component v-if="componentExists('MapoTopBarTitleSlot')" :is="'MapoTopBarTitleSlot'"/>
    <v-spacer></v-spacer>
    <component v-if="componentExists('MapoTopBarRightSlot')" :is="'MapoTopBarRightSlot'"/>
  </v-app-bar>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  name: "Topbar",
  setup(){
    const appStore = useAppStore()
    return { appStore }
  },
  methods: {
    componentExists(name){
      // return name in this.$options.components;
      // TODO: check if is the correct way to check if a component exists
      return name in getCurrentInstance()?.appContext.components;
    }
  },
};
</script>
