<template>
  <v-app-bar
    :clipped-left="get_clipped"
    fixed
    app
    flat
    dense
  >
    <component v-if="componentExists('MapoTopBarLeftSlot')" :is="'MapoTopBarLeftSlot'" />
    <component v-if="componentExists('MapoTopBarToggleIconSlot')" :is="'MapoTopBarToggleIconSlot'" :toggleSidebarDrawer="toggleSidebarDrawer" />
    <component v-if="componentExists('MapoTopBarToggleIconSlot')" :is="'MapoTopBarToggleIconSlot'" />
    <v-app-bar-nav-icon v-else @click.stop="toggleSidebarDrawer" />
    <component v-if="componentExists('MapoTopBarTitleSlot')" :is="'MapoTopBarTitleSlot'"/>
    <v-spacer></v-spacer>
    <component v-if="componentExists('MapoTopBarRightSlot')" :is="'MapoTopBarRightSlot'"/>
  </v-app-bar>
</template>

<script>
import { mapState } from 'pinia'
import { getCurrentInstance } from 'vue';

export default {
  name: "Topbar",
  setup(){
    const store = useAppStore()
    const { get_clipped, toggleSidebarDrawer } = store
    return { get_clipped, toggleSidebarDrawer }
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
