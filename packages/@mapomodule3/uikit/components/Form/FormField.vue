<template>
  <component
    class="mapo-field"
    :class="classes"
    :is="is"
    v-model="model"
    v-bind="fieldAttrs"
  >
    <template v-for="(_, slot) in $slots" :slot="slot">
      <!-- @vuese-ignore -->
      <slot :name="slot"></slot>
    </template>
    <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
      <!-- @vuese-ignore -->
      <slot :name="slot" v-bind="props" />
    </template>
  </component>
</template>

<script>
import { getPointed, setPointed } from "@mapomodule/utils/helpers/objHelpers";
import { titleCase } from "@mapomodule/utils/helpers/formatters";

import defaults from "./defaults";
import { debounce } from "@mapomodule/utils/helpers/debounce";
const _ = require("lodash");  

/**
 * This is mainly an internal component. It is used by the [`DetailComponent`](/components/detail/Detail/) in order to render dinamic fields inside the main form.
 */
export default {
  name: "FormField",
  data() { return { model: null, }; },
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
      default() { return this.$mapo.$options?.content?.languages || []; },
    },
    currentLang: String,
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
    setValue(val) {
      const dump = { ...this.value }; // since we cannot directly edit a prop
      setPointed(dump, this.kpointed, this.accessor.set({ model: dump, val }));
      if (typeof this.conf.onChange == "function")
        this.conf.onChange({
          val,
          model: dump,
          currentLang: this.currentLang,
          languages: this.langs,
          conf: this.conf,
          kpointed: this.kpointed,
        });

      // Fired when the v-model changes.
      // @arg Emits the entire payload modified.
      this.$emit("input", dump);
    },
    extractValue(val = this.value) {
      return this.accessor.get({
        model: { ...val },
        val: getPointed({ ...val }, this.kpointed),
      });
    },
    setModel(val = this.value) {
      var model = this.extractValue(val);
      if (val && JSON.stringify(this.model) !== JSON.stringify(model))
        this.model = model;
    },
  },
  computed: {
    componentInfo() {
      const originalName = this.is?.options?.name || this.is?.name || this.is;
      const camelName = originalName.replace(/-./g, (x) => x[1].toUpperCase());
      const kebabName = originalName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      return { originalName, camelName, kebabName }
    },
    options(){
      return _.merge(defaults, this.$mapo.$options?.ui?.forms?.fields);
    },
    defaultAccess() {
      return this.options.accessor[this.componentInfo.camelName] || this.options.accessor[this.componentInfo.kebabName];
    },
    defaultAttrs() {
      const componentAttrs = this.options.attrs[this.componentInfo.camelName] || this.options.attrs[this.componentInfo.kebabName];
      return {...componentAttrs, ...this.options.attrs.All};
    },
    classes() {
      var upperClasses = this.fieldAttrs.class;
      if (typeof upperClasses == "string") {
        upperClasses = { [upperClasses]: true };
      } else if (Array.isArray(upperClasses)) {
        upperClasses = upperClasses.reduce(
          (acc, next) => ({ ...acc, [next]: true }),
          {}
        );
      }
      return {
        ...upperClasses,
        [`mapo-field-${this.conf.value}`]: true,
        "mapo-field--has-errors": this.hasErrors,
      };
    },
    kpointed() {
      let kpointed = this.conf.value;
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
        ...this.defaultAccess,
        ...this.conf.accessor,
      };
    },
    errorMessages() {
      return this.kpointed
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
        }, []);
    },
    hasErrors() {
      return !!this.errorMessages.length;
    },
    fieldAttrs() {
      return {
        label: this.label,
        errorMessages: this.errorMessages,
        hideDetails: this.hasErrors,
        ...this.defaultAttrs,
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
      const dynImport = typeof this.conf.is == "string" && this.options.components[this.conf.is.replace(/-./g, (x) => x[1].toUpperCase())];
      return (
        dynImport || this.conf.is ||
        (this.conf.type && this.options.mapping[this.conf.type]) ||
        this.options.mapping.text
      );
    },
  },
  mounted() {
    this.setModel();
  },
};
</script>
