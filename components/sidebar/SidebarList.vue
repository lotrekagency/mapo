<template>
  <div class="sidebar__list">
    <SidebarListItem
      class="sidebar__list__item"
      v-for="(item, i) in routerList"
      :key="i"
      :link="item.path"
      :title="item.name"
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
    return {
      routerList: this.routerList
    };
  },
  props: {
  },
  mounted: function () {
    
    this.routerList = []
    this.$router.options.routes.forEach(element => {
      this.routerList.push(element)
    });
    
  },
};
</script>
