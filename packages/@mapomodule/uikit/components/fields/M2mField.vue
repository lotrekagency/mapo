<template>
  <v-autocomplete v-bind="fieldAttrs" v-model="model" :items="options"></v-autocomplete>
</template>

<script>
/**
 * This component is made to simplify Many To Many associations. With this component you can modify an array selecting items from a list of checkboxes.
 */

export default {
  name: "M2mField",
  data() {
    return {
      model: null,
      options: [],
    };
  },
  props: {
    // V-model property. It is the array to be modified.
    value: {
      type: Object | Array | null,
      required: true,
    },
    // This is the array of options from which you can choose.
    items: {
      type: Array,
      default: () => [],
    },
    endpoint: String,
  },
  computed: {
    fieldAttrs() {
      return {
        itemValue: "id",
        returnObject: true,
        chips: this.$attrs.multiple === false ? false : true,
        multiple: true,
        ...this.$attrs,
      };
    },
  },
  watch: {
    items(val) {
      this.options = val || [];
    },
    value(val) {
      this.model = val;
    },
    model(val) {
      this.$emit("input", val);
    },
  },
  mounted() {
    if (this.endpoint) {
      this.$mapo.$api
        .crud(this.endpoint)
        .list()
        .then((res) => (this.options = res));
    }
  },
};
</script>