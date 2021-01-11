<template>
  <div class="sidebar__list">
    <SidebarListItem
      class="sidebar__list__item"
      v-for="(item, i) in listItems"
      :key="i"
      :link="item.to"
      :title="item.title"
      :icon="item.icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  &__list {
    display: flex;
    flex-direction: column;
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  props: {
    listItems: Array,
  },
  mounted: function () {},
};
</script>
