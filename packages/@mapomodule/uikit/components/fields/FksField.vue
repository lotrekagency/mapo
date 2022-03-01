<template>
  <v-autocomplete
    v-bind="fieldAttrs"
    v-model="model"
    :items="options"
  ></v-autocomplete>
</template>

<script>
/**
 * This component is made to simplify Many To Many associations. With this component you can modify an array selecting items from a list of checkboxes.
 */

export default {
  name: "FksField",
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
    endpoint: String | Object,
  },
  computed: {
    fieldAttrs() {
      return {
        chips: this.$attrs.multiple === false ? false : true,
        multiple: true,
        ...this.$attrs,
      };
    },
    crudConfig() {
      switch (typeof this.endpoint) {
        case "string":
          return {
            url: this.endpoint,
            conf: null,
          };
        case "object":
          return {
            url: this.endpoint.url,
            conf: this.endpoint.conf,
          };
        default:
          return { url: "", conf: null };
      }
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
    if (this.crudConfig.url) {
      this.$mapo.$api
        .crud(this.crudConfig.url)
        .list(this.crudConfig.conf)
        .then((res) => (this.options = res));
    }
  },
};
</script>