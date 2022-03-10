<template>
  <div>
    <span class="mapo-label" :class="`mapo-label-${conf.value}`">{{label}}</span>
    <component :is="is" v-model="model" v-bind="fieldAttrs"></component>
  </div>
</template>

<style>
.mapo-label {
  display: none;
}
</style>

<script>
import wygEditor from "@mapomodule/uikit/components/fields/wygEditor/wygEditor.vue";
import DateField from "@mapomodule/uikit/components/fields/DateField.vue";
import FksField from "@mapomodule/uikit/components/fields/FksField.vue";
import MediaM2mField from "@mapomodule/uikit/components/fields/MediaM2mField.vue";
import MediaField from "@mapomodule/uikit/components/fields/MediaField.vue";
import SeoPreview from "@mapomodule/uikit/components/fields/SeoPreview.vue";
import FileField from "@mapomodule/uikit/components/fields/FileField.vue";

import { getPointed, setPointed } from "@mapomodule/utils/helpers/objHelpers";
import defaults from "./defaults";

/**
 * This is mainly an internal component. It is used by the [`DetailComponent`](/components/detail/Detail/) in order to render dinamic fields inside the main form.
 */
export default {
  name: "DetailField",
  components: {
    wygEditor,
    DateField,
    FksField,
    MediaM2mField,
    MediaField,
    SeoPreview,
    FileField,
  },

  data() {
    return {
      model: null,
      defaultMap: defaults.mapping,
      defaultAttrs: defaults.props,
      defaultAccess: defaults.accessor,
    };
  },
  props: {
    // V-model of the payload needed to edit the field value in realtime.
    value: {
      type: Object,
      required: true,
    },
    // An object representing all the errors of all fields. This means that this component will find the error of its field following the dottedPath of the value in the error dict.
    errors: Object,
    // The main configuration that determines the rendering of the field. See [FieldConfiguration](/components/detail/Detail/#fieldconfiguration).
    conf: {
      // [`FieldConfiguration`](/components/detail/Detail/#fieldconfiguration)
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
    "conf.value"(newValue, oldValue) {
      if (newValue !== oldValue) {
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
    },
  },
  methods: {
    setModel(val = this.value) {
      var model = this.accessor.get({
        model: { ...val },
        val: getPointed({ ...val }, this.conf.value),
      });
      if (val && JSON.stringify(this.model) !== JSON.stringify(model))
        this.model = model;
    },
  },
  computed: {
    accessor() {
      let func = function ({ val }) {
        return val;
      };
      return {
        get: func,
        set: func,
        ...(this.defaultAccess[this.is] || {}),
        ...this.conf.accessor,
      };
    },
    fieldAttrs() {
      return {
        label: this.label,
        errorMessages: this.conf.value
          .split(".")
          .map((_, i, a) => a.slice(0, i + 1).join("."))
          .reduce((acc, next) => {
            const error = getPointed(this.errors || {}, next, []);
            if (Array.isArray(error)) {
              acc = [...acc, ...error];
            } else if (typeof error == "string") {
              acc = [...acc, error];
            }
            return acc;
          }, []),
        ...this.defaultAttrs.All,
        ...(this.defaultAttrs[
          this.is.replace(/-./g, (x) => x[1].toUpperCase())
        ] || {}),
        ...this.conf.attrs,
      };
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
        (this.conf.type && this.defaultMap[this.conf.type]) ||
        "vTextField"
      );
    },
  },
  mounted(){
    this.setModel()
  }
};
</script>