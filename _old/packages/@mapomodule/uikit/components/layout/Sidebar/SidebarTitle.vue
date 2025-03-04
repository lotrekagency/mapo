<template>
  <v-list-item class="sidebar-title--container">
    <v-list-item-avatar class="sidebar-title--logo" v-if="logo">
      <v-img :src="logo"></v-img>
    </v-list-item-avatar>
    <v-list-item-icon v-else>
      <v-icon color="secondary">mdi-artstation</v-icon>
    </v-list-item-icon>
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
  computed:{
    title(){
      return this.$mapo.$options?.ui?.panelName || "BACKOFFICE"
    },
    logo(){
      return this.$mapo.$options?.ui?.panelLogo
    }
  },
  methods: {
    toggleMiniVariant() {
      this.$store.dispatch("mapo/app/toggleSidebarMinivariant");
    },
  },
};
</script>
