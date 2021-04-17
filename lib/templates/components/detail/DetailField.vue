<template>
  <component :is="is" v-model="model" v-bind="fieldProp"></component>
</template>

<script>
import defaults from "~mapomodule/components/detail/defaults.js";
import TinyMce from "~mapomodule/components/fields/TinyMce/TinyMce.vue";
import DateField from "~mapomodule/components/fields/DateField.vue";
import M2mField from "~mapomodule/components/fields/M2mField.vue";
import MediaM2mField from "~mapomodule/components/fields/MediaM2mField.vue";
import MediaField from "~mapomodule/components/fields/MediaField.vue";

import { getPointed, setPointed } from "~mapomodule/utils/objHelpers";
import debounce from "~mapomodule/utils/debounce";

export default {
  name: "DetailField",
  components: {
    TinyMce,
    DateField,
    M2mField,
    MediaM2mField,
    MediaField
  },

  data() {
    return {
      model: null,
      fieldsMap: defaults.mapping,
      fieldsProps: defaults.props,
      fieldsAccess: defaults.accessor
    };
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    errors: Object,
    conf: {
      type: Object,
      required: true
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.setModel(val);
      }
    },
    conf(newConf, oldConf) {
      if (newConf.value !== oldConf.value) {
        this.setModel();
      }
    },
    model: {
      handler: debounce(function(val) {
        const dump = { ...this.value };
        setPointed(
          dump,
          this.conf.value,
          this.accessor.set({ model: { ...this.value }, val })
        );
        this.$emit("input", dump);
      }, 200)
    }
  },
  methods: {
    setModel(val = this.value) {
      var model = this.accessor.get({
        model: { ...val },
        val: getPointed({ ...val }, this.conf.value)
      });
      if (val && JSON.stringify(this.model) !== JSON.stringify(model))
        this.model = model;
    }
  },
  computed: {
    accessor() {
      let func = function({ val }) {
        return val;
      };
      return {
        get: func,
        set: func,
        ...(this.fieldsAccess[this.is] || {}),
        ...this.conf.accessor
      };
    },
    fieldProp() {
      return {
        label: this.label,
        errorMessages: getPointed(this.errors || {}, this.conf.value, []),
        ...(this.fieldsProps[this.is] || {}),
        ...this.conf.attrs
      };
    },
    label() {
      if (this.conf.label !== undefined) {
        return this.conf.label;
      }
      const titleCase = string =>
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
        (this.conf.type && this.fieldsMap[this.conf.type]) ||
        "v-text-field"
      );
    }
  }
};
</script>