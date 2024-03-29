<template>
  <div v-if="userCanSee" :class="{ child, expanded, 'spider-menu': spiderMenu }">
    <v-list-item
      :style="indent"
      :exact-path="expanded"
      :input-value="!expanded && !link && activeChild"
      @click.native="!link && (expanded = !expanded)"
      link
      :to="link"
    >
      <v-list-item-icon v-if="icon">
        <v-icon>{{ icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ label.translate ? $t(label.translate) : label }}
      </v-list-item-title>
      <v-icon
        class="expand-icon"
        v-if="childrens.length"
        :style="rotate"
        @click.native.prevent="link && (expanded = !expanded)"
        >mdi-chevron-down</v-icon
      >
    </v-list-item>

    <div
      class="child-menu"
      :style="indent"
      v-if="childrens.length && expanded && !forceCollapse"
    >
      <SidebarListItem
        v-for="(item, i) in childrens"
        :key="i"
        :link="item.link"
        :label="item.label"
        :meta="item.meta"
        :childrens="item.childrens"
        :depth="(depth || 0) + 1"
        :icon="item.icon"
        :force-collapse="forceCollapse"
        :spider-menu="spiderMenu"
        child
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@mapomodule/uikit/assets/variables.scss";

.v-list-item::after {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 4px;
  left: 0;
}
.v-list-item.v-list-item--active::after {
  background: var(--v-primary-base);
}
.expand-icon {
  margin: 0 0 0 auto;
  cursor: pointer;
  &:hover {
    background: #f7f7f747;
    border-radius: 50%;
  }
}
.spider-menu.child {
  .v-list-item__icon {
    &::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 30px;
      top: -9px;
      margin-left: -4px;
      border-bottom: solid 3px #acacac;
      border-left: solid 3px #acacac;
      z-index: -1;
    }
    &::before {
      content: "";
      position: absolute;
      width: 5px;
      height: 10px;
      top: 21px;
      margin-left: -4px;
      border-left: solid 3px #acacac;
      z-index: -1;
    }
  }
  .child-menu {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 0px;
      height: 100%;
      top: -9px;
      margin-left: -4px;
      border-left: solid 3px #acacac;
      z-index: -1;
    }
  }
}
.spider-menu.child:last-child {
  .v-list-item__icon {
    &::before {
      height: 0px;
    }
    &::after {
      border-bottom-left-radius: 3px;
    }
  }
  .child-menu {
    &::after {
      height: 0px;
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
      nestDepth: 14,
    };
  },
  computed: {
    indent() {
      return {
        paddingLeft: `calc(1rem + ${+this.depth * this.nestDepth}px)`,
        marginLeft:
          this.depth > 1 && `calc(-1rem - ${(this.depth - 1) * this.nestDepth}px)`,
      };
    },
    rotate() {
      return {
        transform: this.expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1)",
      };
    },
    activeChild() {
      return (this.childrens || []).some((child) =>
        this.$nuxt.$route.path.startsWith(child.link)
      );
    },
    userCanSee() {
      return this.checkPermissions();
    },
  },
  methods: {
    checkPermissions(child = undefined) {
      const item = child || this;
      const middleware = this.$mapo.$auth.getRouteMiddlewares({ meta: item.meta });
      if (middleware.includes("permissions")) {
        const { model } = item.meta?.permissions || {};
        return this.$store.getters["mapo/user/hasModelPermission"](model, "view");
      }
      if (middleware.includes("auth")) {
        return this.$mapo.$auth.user.isLoggedIn;
      }
      return (
        item.childrens.length == 0 || item.childrens.some((c) => this.checkPermissions(c))
      );
    },
  },
  props: {
    link: String,
    label: String | Object,
    icon: String,
    childrens: Array,
    meta: Object,
    depth: Number,
    forceCollapse: Boolean,
    child: Boolean,
    spiderMenu: Boolean,
  },
};
</script>
