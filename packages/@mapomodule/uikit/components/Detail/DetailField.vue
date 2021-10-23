<template>
  <component :is="is" v-model="model" v-bind="fieldProp"></component>
</template>

<script>
import TinyMce from "@mapomodule/uikit/components/fields/TinyMce/TinyMce.vue";
import DateField from "@mapomodule/uikit/components/fields/DateField.vue";
import M2mField from "@mapomodule/uikit/components/fields/M2mField.vue";
import MediaM2mField from "@mapomodule/uikit/components/fields/MediaM2mField.vue";
import MediaField from "@mapomodule/uikit/components/fields/MediaField.vue";

import { getPointed, setPointed } from "@mapomodule/utils/helpers/objHelpers";
import defaults from "./defaults";

/**
 * This is mainly an internal component. It is used by the [`DetailComponent`](/components/detail/Detail/) in order to render dinamic fields inside the main form.
 */
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
    // V-model of the payload needed to edit the field value in realtime.
    value: {
      type: Object,
      required: true
    },
    // An object representing all the errors of all fields. This means that this component will find the error of its field following the dottedPath of the value in the error dict.
    errors: Object,
    // The main configuration that determines the rendering of the field. See [FieldConfiguration](/components/detail/Detail/#fieldconfiguration).
    conf: {
      // [`FieldConfiguration`](/components/detail/Detail/#fieldconfiguration)
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
    model(val) {
      const dump = { ...this.value };
      setPointed(
        dump,
        this.conf.value,
        this.accessor.set({ model: { ...this.value }, val })
      );
      // Fired when the v-model changes.
      // @arg Emits the entire payload modified.
      this.$emit("input", dump);
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