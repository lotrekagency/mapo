<template>
  <component :is="is" v-model="model" v-bind="fieldProp"></component>
</template>

<script>
import TinyMce from "~mapomodule/components/fields/tinymce/TinyMce.vue";
import DateField from "~mapomodule/components/fields/DateField.vue";
import { getPointed, setPointed } from "~mapomodule/utils/objHelpers";
import debounce from "~mapomodule/utils/debounce";

export default {
  name: "mapo-field",
  components: {
    TinyMce,
    DateField,
  },

  data() {
    return {
      model: null,
      mapping: {
        text: "v-text-field",
        select: "v-select",
        date: "date-field",
        textarea: "v-textarea",
        switch: "v-switch",
        slider: "v-slider",
        file: "v-file-input",
        editor: "tiny-mce",
      },
    };
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    conf: {
      type: Object,
      required: true,
    },
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.setModel(val);
      },
    },
    conf(newConf, oldConf) {
      if (newConf.value !== oldConf.value) {
        this.setModel();
      }
    },
    model: {
      handler: debounce(function (val) {
        const dump = { ...this.value };
        setPointed(
          dump,
          this.conf.value,
          this.accessor.set({ model: { ...this.value }, val })
        );
        this.$emit("input", dump);
      }, 200),
    },
  },
  methods: {
    setModel(val) {
      const out = val || this.value;
      var model = this.accessor.get({
        model: { ...out },
        val: getPointed({ ...out }, this.conf.value),
      });
      if (out && this.model !== model) this.model = model;
    },
  },
  computed: {
    accessor() {
      let func;
      if (["v-date-picker", "date-field"].includes(this.is)) {
        func = function ({ val }) {
          return val && new Date(val).toISOString().split("T")[0];
        };
      } else {
        func = function ({ val }) {
          return val || "";
        };
      }
      return { get: func, set: func, ...this.conf.accessor };
    },
    fieldProp() {
      const defaultProps = {
        outlined: true,
        label: this.label,
        itemText: "text",
        itemValue: "value",
      };
      return { ...defaultProps, ...this.conf.attrs };
    },
    label() {
      if (this.conf.label !== undefined) {
        return this.conf.label;
      }
      const titleCase = (string) =>
        (string && string[0].toUpperCase() + string.slice(1).toLowerCase()) ||
        "";
      return titleCase(
        (this.conf.value || "")
          .replace(/^translations\.\w\w\./, "")
          .split(".")
          .join(" ")
          .replace(/_/, " ")
      );
    },
    is() {
      return (
        this.conf.is ||
        (this.conf.type && this.mapping[this.conf.type]) ||
        "v-text-field"
      );
    },
  },
  mounted() {},
};
</script>