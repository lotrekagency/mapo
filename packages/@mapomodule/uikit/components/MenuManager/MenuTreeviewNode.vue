<template>
  <div
    @dblclick.stop="editTitle = true"
    class="menu-treeeview-node--wrapper"
    v-if="inNode"
  >
    <v-btn
      icon
      @click.stop="open = !open"
      class="menu-treeeview-node--expand-icon"
    >
      <v-icon :class="{ 'mdi-rotate-90': open }">mdi-menu-right</v-icon>
    </v-btn>
    <v-list-item-title
      v-if="!inNode.new && !editTitle"
      v-html="inNode.title.trim() || '&nbsp;'"
      class="menu-treeeview-node--title"
      @keydown.delete="$emit('delete', inNode)"
      tabindex="0"
    ></v-list-item-title>
    <v-list-item-content v-else>
      <v-text-field
        v-model="title"
        class="menu-treeeview-node--title-edit"
        autofocus
        hide-details
        dense
        @blur="setNodeTitle"
        @keydown.enter.stop="setNodeTitle"
        @click.stop=""
      ></v-text-field>
    </v-list-item-content>
    <v-list-item-icon v-if="hasErrors" class="ma-0">
      <v-icon size="40" color="error">mdi-circle-small</v-icon>
    </v-list-item-icon>
    <v-list
      dense
      class="menu-treeview-node--list shift"
      v-show="open || inDragging"
    >
      <v-list-item-group :value="inSelected" :value-comparator="compareItems">
        <draggable
          v-model="inNode.nodes"
          :emptyInsertThreshold="25"
          group="nodes"
          draggable=".menu-treeview--draggable"
          @start="inDragging = true"
          @end="inDragging = false"
        >
          <v-list-item
            v-for="(item, i) in inNode.nodes"
            :key="i + '_' + item.id + 'CAT'"
            :value="item"
            class="menu-treeview--draggable"
            @click.stop="item.title && select(item)"
          >
            <MenuTreeviewNode
              :node="item"
              :selected.sync="inSelected"
              :dragging.sync="inDragging"
              ref="nodes"
              @delete="$emit('delete', $event)"
              @update:node="$emit('update:node', inNode)"
            />
          </v-list-item>
        </draggable>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
.menu-treeeview-node--wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.menu-treeeview-node--expand-icon,
.menu-treeeview-node--title,
.menu-treeeview-node--title-edit {
  display: inline;
}
.v-list--dense .v-list-item .v-list-item__content {
  padding: 0;
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
      editTitle: false,
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
        this.inNode.resolve && this.inNode.resolve(this.inNode);
      } else {
        this.inNode.reject && this.inNode.reject(this.inNode);
      }
      this.$nextTick(() => {
        this.editTitle = false;
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
        return true;
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
