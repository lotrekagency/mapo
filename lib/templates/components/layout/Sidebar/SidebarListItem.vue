<template>
  <div :style="indent" class="sidebar__link__wrapper">
    <NuxtLink v-if="link" class="sidebar__link" :to="link">
      <v-icon v-if="icon" class="sidebar__link__icon">{{ icon }}</v-icon>
      {{ label }}
      <v-icon
        class="expand-icon"
        v-if="childrens.length"
        :style="rotate"
        @click.native.prevent="expanded = !expanded"
        >mdi-chevron-down</v-icon
      >
    </NuxtLink>
    <span
      @click.prevent="expanded = !expanded"
      v-if="!link"
      class="sidebar__link"
    >
      <v-icon v-if="icon" class="sidebar__link__icon">{{ icon }}</v-icon>
      {{ label }}
      <v-icon :style="rotate" class="expand-icon" v-if="childrens.length"
        >mdi-chevron-down</v-icon
      >
    </span>
    <div v-if="childrens.length && expanded">
      <SidebarListItem
        class="sidebar__list__item"
        v-for="(item, i) in childrens"
        :key="i"
        :link="item.link"
        :label="item.label"
        :childrens="item.childrens"
        :depth="depth || 0 + 1"
        :icon="item.icon"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";

.expand-icon {
  margin: 0 0 0 auto;
  cursor: pointer;
  &:hover {
    background: #f7f7f747;
    border-radius: 50%;
  }
}

.sidebar {
  &__link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: $white;
    background: rgba(0, 0, 0, 0);
    transition: all linear 0.25s;
    text-transform: capitalize;
    &:hover {
      background: rgba(0, 0, 0, 0.25);
    }
    &__icon {
      margin-right: 0.5rem;
    }
  }
}
</style>

<script>
export default {
  name: "SidebarListItem",
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    indent() {
      return { marginLeft: `${+this.depth * 10}px` };
    },
    rotate() {
      return {
        transform: this.expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1)",
      };
    },
  },
  props: {
    link: String,
    label: String,
    icon: String,
    childrens: Array,
    depth: Number,
  },
};
</script>
