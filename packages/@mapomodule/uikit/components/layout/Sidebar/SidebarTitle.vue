<template>
  <v-list-item class="sidebar-title--container">
    <template v-slot:prepend>
      <v-avatar v-if="logo" class="sidebar-title--logo">
        <v-img :src="logo"></v-img>
      </v-avatar>
      <v-icon color="secondary" v-else>mdi-artstation</v-icon>
    </template>
    <v-list-item-title>
        <b>{{title}}</b>
    </v-list-item-title>
    <v-btn icon @click.stop="toggleMiniVariant">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-list-item>
</template>

<style lang="scss">
.sidebar-title--container{
  background: var(--v-primary-base);
  color: var(--v-secondary-base);
}
.sidebar-title--logo{
  left: -8px;
}
</style>

<script>
// @vuese
export default {
  setup(){
    const appStore = useAppStore()
    return { appStore }
  },
  computed:{
    title(){
      // return this.$mapo.$options?.ui?.panelName || "BACKOFFICE"
      return "BACKOFFICE"
    },
    logo(){
      // return this.$mapo.$options?.ui?.panelLogo
      return null
    }
  },
  methods: {
    toggleMiniVariant() {
      this.appStore.toggleSidebarMinivariant()
    },
  },
};
</script>
