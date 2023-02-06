<template>
  <div class="expand-all" v-if="inNode">
    <v-btn icon @click.stop="open = !open" class="d-inline">
      <v-icon :class="{ 'mdi-rotate-90': open }">mdi-menu-right</v-icon>
    </v-btn>
    <v-list-item-title
      v-if="!inNode.new"
      v-text="inNode.title"
      class="d-inline item-title"
    ></v-list-item-title>
    <v-list-item-content v-else>
      <v-text-field
        v-model="title"
        class="d-inline"
        autofocus
        hide-details
        dense
        @blur="setNodeTitle()"
        @keydown.enter.stop="setNodeTitle()"
        @click.stop=""
      ></v-text-field>
    </v-list-item-content>
    <v-list-item-icon v-if="hasErrors" class="ma-0">
      <v-icon size="40" color="error">mdi-circle-small</v-icon>
    </v-list-item-icon>
    <v-list dense class="pa-0 pl-4 list" v-if="open || inDragging">
      <v-list-item-group :value="inSelected" :value-comparator="compareItems">
        <draggable
          v-model="inNode.nodes"
          :emptyInsertThreshold="25"
          group="nodes"
          draggable=".item"
          @start="inDragging = true"
          @end="inDragging = false"
        >
          <v-list-item
            v-for="(item, i) in inNode.nodes"
            :key="i + '_' + item.id + 'CAT'"
            :value="item"
            class="pa-0 item"
            @click.stop="item.title && select(item)"
          >
            <MenuTreeviewNode
              :node="item"
              :selected.sync="inSelected"
              :dragging.sync="inDragging"
              ref="nodes"
              @update:node="$emit('update:node', inNode)"
            />
          </v-list-item>
        </draggable>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<i18n lang="yaml">
en-us:
  empty: "No items found"
it-it:
  empty: "Nessun elemento trovato"
</i18n>

<style scoped>
.expand-all {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.shift-right {
  padding: 0px;
  padding-left: 24px;
}

.list {
  width: 100%;
  background-color: inherit;
}
.list .item-title {
  flex-basis: 0%;
}

.sortable-drag {
  opacity: 0.5;
}
</style>

<script>
import draggable from "vuedraggable";

export default {
  name: "MenuTreeviewNode",
  components: { draggable },
  props: {
    node: {
      type: Object,
      required: true,
    },
    selected: {
      type: Object,
      default: null,
    },
    root: {
      type: Boolean,
      default: true,
    },
    dragging: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    inDragging(val) {
      this.$emit("update:dragging", val);
    },
    dragging(val) {
      this.inDragging = val;
    },
    selected(val) {
      this.inSelected = val;
    },
    inSelected(val) {
      this.$emit("update:selected", val);
    },
    node: {
      handler(val) {
        this.inNode = val;
      },
      deep: true,
    },
  },
  data() {
    return {
      inDragging: this.dragging,
      inSelected: this.selected,
      inNode: this.node,
      open: true,
      title: this.node?.title,
    };
  },
  computed: {
    hasErrors() {
      return this.node?.errors && Object.keys(this.node.errors).length > 0;
    },
  },
  methods: {
    select(e) {
      this.inSelected = e;
    },
    setNodeTitle() {
      if (this.title) {
        this.$set(this.inNode, "title", this.title);
        this.$set(this.inNode, "new", false);
        this.inNode.resolve(this.inNode);
      } else {
        this.inNode.reject(this.inNode);
      }
      this.$nextTick(() => {
        delete this.inNode.new;
        delete this.inNode.resolve;
        delete this.inNode.reject;
      });
    },
    compareItems(a, b) {
      return a && b && a.id === b.id;
    },
    findChildIndex(node) {
      return this.inNode.nodes.findIndex(({ id }) => id == node.id);
    },
    deleteChild(node) {
      let i = this.findChildIndex(node);
      if (i > -1) {
        this.inNode.nodes.splice(i, 1);
        return true
      }
      return this.$refs.nodes?.some((nodeRef) => nodeRef.deleteChild(node));
    },
    openIfChild(node) {
      if (this.findChildIndex(node) > -1) {
        this.open = true;
      }
    },
  },
};
</script>