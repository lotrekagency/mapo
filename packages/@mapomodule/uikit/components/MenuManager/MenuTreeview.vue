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
          :move="move"
          draggable=".menu-treeview--draggable"
          @start="_dragging = true"
          @end="_dragging = false"
          data-depth="0"
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
              :max-depth="maxDepth"
              @delete="deleteNode"
              @silentDelete="silentDeleteNode"
              ref="nodes"
            />
          </v-list-item>
        </draggable>
        <div
          @click="newNode"
          class="menu-treeview--empty"
          v-if="inNodes.length == 0"
        >
          <v-icon size="40"> mdi-view-grid-plus </v-icon>
          <p>{{ $t("mapo.menuTreeview.noRootNodes") }}</p>
        </div>
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
.menu-treeview--main-draggable-wrapper {
  padding-bottom: 100px;
}
.sortable-chosen {
  background-color: var(--v-primary-darken2);
  opacity: 0.3;
  border: 1px dashed var(--v-primary-darken4);
  transition: all 0.1s 0.5s linear;
}
.menu-treeview--empty {
  flex: 1;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}
</style>

<script>
import draggable from "vuedraggable";
import { calcMaxMenuNestDepth } from "@mapomodule/utils/helpers/menu";

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
    maxDepth: {
      type: Number,
      default: -1
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
    move(val){
      let { draggedContext: { element }} = val
      let totalDepth = calcMaxMenuNestDepth(element) + (+val.to.dataset.depth);
      return !(this.maxDepth > 0 && totalDepth >= this.maxDepth)
    },
    newNode() {
      let node = {
        new: true,
        title: "",
        id: Math.random().toString(36).slice(2),
        nodes: [],
        meta: {},
        link: { relational: {} },
      };
      if (this.maxDepth > 0 && this.currentDepth >= this.maxDepth){
        this.inNodes.push(node);
      } else {
        this.selected ? this.selected.nodes.push(node) : this.inNodes.push(node);
      }
      this.$refs?.nodes?.forEach((nodeRef) => nodeRef.openIfChild(node));
    },
    compareItems(a, b) {
      return a && b && a.id === b.id;
    },
    silentDeleteNode(node) {
      let isSelected = this.selected?.id == node?.id;
      let i = this.nodes?.findIndex(({ id }) => id == node.id);
      if (i > -1) {
        this.nodes?.splice(i, 1);
        this.selected = isSelected ? null : this.selected;
      } else {
        this.selected =
          this.$refs.nodes?.some((nodeRef) =>
            nodeRef.deleteChild(node)
          ) && isSelected
            ? null
            : this.selected;
      }
    },
    deleteNode(node) {
      this.$mapo.$confirm
        .open({
          title: this.$t("mapo.delete"),
          question: this.$t("mapo.menuTreeview.areYouSureDelete"),
          approveButton: {
            text: this.$t("mapo.delete"),
            attrs: { color: "red", text: true },
          },
        })
        .then((ok) => ok && this.silentDeleteNode(node));
    },
    deleteSelectedNode() {
      return this.deleteNode(this.selected);
    },
  },
  computed: {
    currentDepth() {
      let find = (nodes, depth = 0) => {
        let node = nodes.find(({ id }) => id == this.selected?.id);
        return node
          ? depth + 1
          : nodes
              .filter(({ nodes }) => nodes.length)
              .reduce((acc, node) => {
                return acc > 0 ? acc : find(node.nodes, depth + 1);
              }, 0);
      };
      return this.selected ? find(this.nodes) : 0},
  }
};
</script>
