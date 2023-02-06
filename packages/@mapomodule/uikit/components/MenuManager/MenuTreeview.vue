<template>
  <div class="menu-treeview--wrapper">
    <slot name="treeview.top" v-bind="{ newNode, nodes, value }" />
    <div class="menu-treeview--tools">
      <h5>{{ title }}</h5>
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="newNode">
              <v-icon>mdi-view-grid-plus</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("mapo.menuTreeview.newNode") }}</span>
        </v-tooltip>
      </div>
    </div>
    <v-list
      dense
      class="menu-treeview--main menu-treeview-node--list"
      @click.native="selected = null"
    >
      <v-list-item-group :value="selected" :value-comparator="compareItems">
        <draggable
          v-model="inNodes"
          class="menu-treeview--main-draggable-wrapper" 
          :emptyInsertThreshold="25"
          group="nodes"
          draggable=".menu-treeview--draggable"
          @start="_dragging = true"
          @end="_dragging = false"
        >
          <v-list-item
            v-for="item in inNodes"
            :key="item.id"
            :value="item"
            class="menu-treeview--draggable"
            @click.stop="selected = item"
          >
            <MenuTreeviewNode
              :node="item"
              :selected.sync="selected"
              @delete="deleteNode"
              ref="nodes"
            />
          </v-list-item>
        </draggable>
      </v-list-item-group>
    </v-list>
    <slot name="treeview.bottom" v-bind="{ newNode, nodes, value }" />
  </div>
</template>

<style lang="scss">
.menu-treeview--wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.menu-treeview--tools {
  background-color: var(--v-primary-base);
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.menu-treeview--main {
  padding: 0;
  flex: 1;
  overflow: auto;
}
.menu-treeview-node--list {
  width: 100%;
  background-color: inherit;
  padding: 0;
  &.shift {
    padding-left: 10px;
  }
  .v-list-item {
    padding: 0;
  }
  .menu-treeeview-node--title {
    flex-basis: 0%;
  }
}
.menu-treeview--main-draggable-wrapper{
  padding-bottom: 100px;
}
.sortable-chosen {
  background-color: var(--v-primary-darken2);
  opacity: 0.3;
  border: 1px dashed var(--v-primary-darken4);
  transition: all 0.1s 0.5s linear;
}
</style>

<script>
import draggable from "vuedraggable";

export default {
  name: "MenuTreeview",
  components: { draggable },
  props: {
    nodes: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Array,
      default: () => [],
    },
    title: String,
    value: {
      type: Object | null,
      required: false,
    },
    loading: Boolean,
  },
  data() {
    return {
      inNodes: this.nodes,
      selected: this.value,
    };
  },
  watch: {
    value(val) {
      this.selected = val;
    },
    selected(val) {
      this.$emit("input", val);
    },
    nodes(val) {
      this.inNodes = val;
    },
    inNodes(val) {
      this.$emit("update:nodes", val);
    },
  },
  methods: {
    newNode() {
      let node = {
        new: true,
        title: "",
        id: Math.random().toString(36).slice(2),
        nodes: [],
        meta: {},
        link: { relational: {} },
      };
      let promise = new Promise(
        (resolve, reject) => (node = { ...node, resolve, reject })
      );
      (this.selected?.nodes || this.inNodes).push(node);
      this.$refs?.nodes?.forEach((nodeRef) => nodeRef.openIfChild(node));
      return promise
        .then((node) => (this.selected = node))
        .catch((node) => {
          if (this.selected) {
            this.selected.nodes = this.selected.nodes.filter(
              ({ id }) => id != node.id
            );
          } else {
            this.inNodes = this.inNodes.filter(({ id }) => id != node.id);
          }
        });
    },
    compareItems(a, b) {
      return a && b && a.id === b.id;
    },
    deleteNode(node) {
      const isSelected = this.selected.id == node.id;
      this.$mapo.$confirm
        .open({
          title: this.$t("mapo.delete"),
          question: this.$t("mapo.menuTreeview.areYouSureDelete"),
          approveButton: {
            text: this.$t("mapo.delete"),
            attrs: { color: "red", text: true },
          },
        })
        .then((ok) => {
          if (ok) {
            let i = this.nodes?.findIndex(({ id }) => id == node.id);
            if (i > -1) {
              this.nodes?.splice(i, 1);
              this.selected = isSelected ? null : this.selected;
            } else {
              this.selected =
                this.$refs.nodes?.some((nodeRef) =>
                  nodeRef.deleteChild(this.selected)
                ) && isSelected
                  ? null
                  : this.selected;
            }
          }
        });
    },
    deleteSelectedNode() {
      return this.deleteNode(this.selected);
    },
  },
};
</script>
