<template>
  <v-app class="app__wrapper">
    <Sidebar />
    <Topbar :title="title" :drawer="this.$store.getters['mapo/app/drawer']" />
    <v-main>
      <v-container>
        <nuxt />
        <SnackBar />
        <ConfirmDialog ref="rootConfirmDialog" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";

.app {
  &__wrapper {
    // background: $w-1;
  }
}
</style>

<script>
export default {
  data() {
    return {
      title: "Pannello"
    };
  },
  methods: {
    initConfirmDialog(count = 10) {
      this.$nextTick(() => {
        if (this.$refs.rootConfirmDialog) {
          this.$mapo.$confirm = this.$refs.rootConfirmDialog;
        } else if (count > 0) {
          this.initConfirmDialog(count - 1);
        }
      });
    }
  },
  mounted: function() {
    this.initConfirmDialog();
  }
};
</script>
