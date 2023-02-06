<template>
  <div class="fill-height d-flex flex-column">
    <slot name="treeview.top" v-bind="{ newNode, nodes, value }" />
    <div class="tools">
      <h5>{{ title }}</h5>
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="newNode">
              <v-icon>mdi-view-grid-plus</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("newNode") }}</span>
        </v-tooltip>
      </div>
    </div>
    <v-list dense class="pa-0 list flex-grow-1" @click.native="selected = null">
      <v-list-item-group :value="selected" :value-comparator="compareItems">
        <draggable
          v-model="inNodes"
          :emptyInsertThreshold="25"
          group="nodes"
          draggable=".item"
          @start="_dragging = true"
          @end="_dragging = false"
        >
          <v-list-item
            v-for="item in inNodes"
            :key="item.id"
            :value="item"
            class="pa-0 item"
            @click.stop="selected = item"
          >
            <MenuTreeviewNode
              :node="item"
              :selected.sync="selected"
              ref="nodes"
            />
          </v-list-item>
        </draggable>
      </v-list-item-group>
    </v-list>
    <slot name="treeview.bottom" v-bind="{ newNode, nodes, value }" />
  </div>
</template>

<style scoped>
.tools {
  background-color: var(--v-primary-base);
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding-left: 10px;
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
    deleteSelectedNode() {
      this.$mapo.$confirm
        .open({
          title: this.$t("deleteNode"),
          question: this.$t("areYouSureDelete"),
        })
        .then((ok) => {
          if (ok) {
            let i = this.nodes?.findIndex(({ id }) => id == this.selected.id);
            if (i > -1) {
              this.nodes?.splice(i, 1);
              this.selected = null;
            } else {
              this.selected = this.$refs.nodes?.some((nodeRef) =>
                nodeRef.deleteChild(this.selected)
              )
                ? null
                : this.selected;
            }
          }
        });
    },
  },
};
</script>