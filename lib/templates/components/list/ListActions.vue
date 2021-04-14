<template>
  <div v-if="isActive" class="d-flex flex-row align-center fill-height">
    <v-select
      label="Group Actions"
      v-bind="$attrs"
      v-model="action"
      :items="actions"
      item-text="label"
      item-value="handler"
      outlined
      dense
      hide-details
      clearable
    ></v-select>
    <v-btn
      class="rounded-0 elevation-0 ml-2"
      outlined
      color="primary"
      :disabled="!action"
      @click="handleAction"
      >Apply</v-btn
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      action: null,
    };
  },
  props: {
    lookup: {
      type: String,
      default: "id",
    },
    actions: {
      type: Array,
      default() {
        return [
          {
            label: "Permanent delete",
            handler: function () {
              return Promise.all(
                this.selection.map((i) => this.crud.delete(i[this.lookup]))
              );
            }.bind(this),
          },
        ];
      },
    },
    selection: {
      type: Array,
      default: () => [],
    },
    crud: {
      type: Object,
      required: true,
    },
  },
  computed:{
    isActive(){
      return this.$attrs['show-select'] !== undefined
    }
  },
  methods: {
    handleAction() {
      if (!this.selection.length) {
        return this.$mapo.$snack.open({
          message: "You need to select at least one item.",
          color: "error",
        });
      }
      return this.action ? this.action().then((res) => this.$emit('actionCompleted', res)) : () => {};
    },
  },
};
</script>
