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
@import "~mapomodule/assets/variables.scss";

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
export default {
  name: "ListHead",
  props: {
    title: {
      type: String,
      default() {
        return this.$route.name;
      },
    },
    addItem: Boolean,
  },
};
</script>
