<template>
  <div class="sidebar__list">
    <sidebar-list-item
      class="sidebar__list__item"
      v-for="(item, i) in routerList"
      :key="i"
      :link="item.link"
      :label="item.label"
      :childrens="item.childrens"
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
    return {
      defaultIcon: "mdi-chevron-right",
      routerList: this.routerList,
    };
  },
  mounted: function () {
    this.routerList = this.buildRoutes(this.$router.options.routes);
  },
  methods: {
    buildRoutes(routes) {
      return this.nestReduce(
        routes
          .filter((e) => !e.meta || !e.meta.sidebarHide)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((element) => {
            return {
              label:
                (element.meta && element.meta.label) ||
                element.name.split("-").pop(),
              icon: (element.meta && element.meta.icon) || this.defaultIcon,
              meta: element.meta,
              link: element.path,
              name: element.name,
              childrens: [],
            };
          })
      );
    },

    nestReduce(array) {
      return array.reduce((stack, route) => {
        const names = route.name.split("-");
        if (names.length === 1) {
          stack.push(route);
        } else {
          const name = names.shift();
          let pIndex = stack.findIndex((el) => el.name === name);
          if (pIndex === -1) {
            stack.push({
              name: name,
              label: (route.meta && route.meta.parentLabel) || name,
              icon: (route.meta && route.meta.parentIcon) || this.defaultIcon,
              childrens: [],
            });
            pIndex = stack.length - 1;
          }
          stack[pIndex].childrens.push(
            Object.assign(route, { name: names.join("-") })
          );
          stack[pIndex].childrens = this.nestReduce(stack[pIndex].childrens);
        }
        return stack;
      }, []);
    },
  },
};
</script>
