<template>
  <div>
    <v-list-item
      :style="indent"
      :exact-path="expanded"
      @click.native="!link && (expanded = !expanded)"
      link
      :to="link"
    >
      <v-list-item-icon v-if="icon">
        <v-icon>{{ icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ label }}
      </v-list-item-title>
      <v-icon
        class="expand-icon"
        v-if="childrens.length"
        :style="rotate"
        @click.native.prevent="link && (expanded = !expanded)"
        >mdi-chevron-down</v-icon
      >
    </v-list-item>

    <div :style="indent" v-if="childrens.length && expanded">
      <SidebarListItem
        class="sidebar__list__item"
        v-for="(item, i) in childrens"
        :key="i"
        :link="item.link"
        :label="item.label"
        :childrens="item.childrens"
        :depth="(depth || 0) + 1"
        :icon="item.icon"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@mapomodule/uikit/assets/variables.scss";

.expand-icon {
  margin: 0 0 0 auto;
  cursor: pointer;
  &:hover {
    background: #f7f7f747;
    border-radius: 50%;
  }
}
</style>

<script>
export default {
  name: "SidebarListItem",
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    indent() {
      return {
        paddingLeft: `calc(1rem + ${+this.depth * 14}px)`,
        marginLeft: this.depth > 1 && `calc(-1rem - ${(this.depth - 1) * 14}px)`
      };
    },
    rotate() {
      return {
        transform: this.expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1)"
      };
    }
  },
  props: {
    link: String,
    label: String,
    icon: String,
    childrens: Array,
    depth: Number
  }
};
</script>
