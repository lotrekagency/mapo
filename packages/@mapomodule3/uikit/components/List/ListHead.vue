<template>
  <div class="list__head">
    <h1 class="list__head__title display-1">{{ title }}</h1>
    <div class="list__head__button">
      <v-btn
        v-if="addItem && canAdd"
        class="rounded-0 elevation-0"
        color="primary"
        :to="{ path: `${$route.path}/new` }"
        >{{ $t("mapo.listHead.addNew") }} &emsp; <v-icon>mdi-plus</v-icon></v-btn
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@mapomodule/uikit/assets/variables.scss";

.list {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    &__title {
      margin-right: 2rem;
      margin-bottom: 1rem;
    }
    &__button {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      margin-bottom: 1rem;
    }
  }
}
</style>

<script>
/**
 * This component renders the upper part of the list. Specifically, the page title and the button to add new content.
 */
export default {
  name: "ListHead",
  props: {
    // This is the title of the page.
    title: {
      type: String,
      // The route name.
      default() {
        return this.$route.name;
      }
    },
    // This is a boolean that determines the visibility of "new item" button. If set to true will provide the user a link to a detail page for new content creation.
    addItem: Boolean
  },
  computed: {
    canAdd() {
      if (this.$mapo.$auth.routeMiddlewares.includes("permissions")){
        return this.$mapo.$auth.user.permissions.includes("add")
      }
      return true
    },
  }
};
</script>
