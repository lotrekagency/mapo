<template>
  <div>
    <span class="mapo-label" :class="`mapo-label-${conf.value}`">{{label}}</span>
    <component :is="is" v-model="model" v-bind="fieldAttrs">
      <template v-for="(_, slot) in $slots" :slot="slot">
        <!-- @vuese-ignore -->
        <slot :name="slot"></slot>
      </template>
      <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
        <!-- @vuese-ignore -->
        <slot :name="slot" v-bind="props" />
      </template>
    </component>
  </div>
</template>

<style>
.mapo-label {
  display: none;
}
</style>

<script>
import wygEditor from "@mapomodule/uikit/components/Form/fields/wygEditor/wygEditor.vue";
import DateField from "@mapomodule/uikit/components/Form/fields/DateField.vue";
import FksField from "@mapomodule/uikit/components/Form/fields/FksField.vue";
import MediaM2mField from "@mapomodule/uikit/components/Form/fields/MediaM2mField.vue";
import MediaField from "@mapomodule/uikit/components/Form/fields/MediaField.vue";
import EnhancedMediaField from "@mapomodule/uikit/components/Form/fields/EnhancedMediaField.vue";

import SeoPreview from "@mapomodule/uikit/components/Form/fields/SeoPreview.vue";
import FileField from "@mapomodule/uikit/components/Form/fields/FileField.vue";
import Repeater from "@mapomodule/uikit/components/Form/fields/Repeater.vue"

import { getPointed, setPointed } from "@mapomodule/utils/helpers/objHelpers";
import { titleCase } from "@mapomodule/utils/helpers/formatters";

import defaults from "./defaults";
import { debounce } from "@mapomodule/utils/helpers/debounce";

/**
 * This is mainly an internal component. It is used by the [`DetailComponent`](/components/detail/Detail/) in order to render dinamic fields inside the main form.
 */
export default {
  name: "FormField",
  components: {
    wygEditor,
    DateField,
    FksField,
    MediaM2mField,
    MediaField,
    EnhancedMediaField,
    SeoPreview,
    FileField,
    Repeater,
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
    // Makes the field readonly.
    readonly: Boolean,
    // An object representing all the errors of all fields. This means that this component will find the error of its field following the dottedPath of the value in the error dict.
    errors: Object,
    // The main configuration that determines the rendering of the field. See [FieldConfiguration](/components/detail/Detail/#fieldconfiguration).
    conf: {
      // [`FieldConfiguration`](/components/detail/Detail/#fieldconfiguration)
      type: Object,
      required: true,
    },
    langs: {
      type: Array,
      default: () => []
    },
    currentLang: String
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.setModel(val);
      },
    },
    kpointed(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.setModel();
      }
    },
    model(val) {
      var model = this.extractValue(val);
      if (JSON.stringify(val) !== JSON.stringify(model))
        this.debouncedSetValue(val);
    },
  },
  methods: {
    debouncedSetValue: debounce(function (...args) {
      this.setValue(...args);
    }, 300),
    setValue(val){
      const dump = { ...this.value }; // since we cannot directly edit a prop
      setPointed(
        dump,
        this.kpointed,
        this.accessor.set({ model: dump, val })
      );
      if (typeof this.conf.onChange == "function") 
        this.conf.onChange({
          val,
          model: dump,
          currentLang: this.currentLang,
          languages: this.langs,
          conf: this.conf,
          kpointed: this.kpointed
        })

      // Fired when the v-model changes.
      // @arg Emits the entire payload modified.
      this.$emit("input", dump);
    },
    extractValue(val = this.value){
      return this.accessor.get({
        model: { ...val },
        val: getPointed({ ...val }, this.kpointed),
      });
    },
    setModel(val = this.value) {
      var model = this.extractValue(val)
      if (val && JSON.stringify(this.model) !== JSON.stringify(model))
        this.model = model;
    },
  },
  computed: {
    kpointed(){
      let kpointed = this.conf.value
      if (this.currentLang && !this.conf.synci18n) {
        const base = `translations.${this.currentLang}`;
        kpointed = kpointed ? `${base}.${kpointed}` : base;
      }
      return kpointed;
    },
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
      const errorMessages = this.kpointed
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
        }, [])
      return {
        label: this.label,
        errorMessages,
        hideDetails: !errorMessages.length,
        ...this.defaultAttrs.All,
        ...(this.defaultAttrs[
          this.is.replace(/-./g, (x) => x[1].toUpperCase())
        ] || {}),
        readonly: this.readonly,
        ...this.conf.attrs,
        currentLang: this.currentLang,
        langs: this.langs,
      };
    },
    label() {
      if (this.conf.label !== undefined) {
        return this.conf.label;
      }
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