<template>
  <div class="list__head">
    <h2 class="list__head__title display-1">{{ title }}</h2>
    <v-btn
      v-if="addItem"
      class="rounded-0 elevation-0"
      color="primary"
      :to="{path: `${$route.path}/new`}"
      >Add new <v-icon>mdi-plus</v-icon></v-btn
    >
  </div>
</template>

<style lang="scss" scoped>
@import "@mapomodule/uikit/assets/variables.scss";

.list {
  &__head {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 4rem;
    &__title {
      margin-right: 2rem;
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
      },
    },
    // This is a boolean that determines the visibility of "new item" button. If set to true will provide the user a link to a detail page for new content creation.
    addItem: Boolean,
  },
};
</script>
