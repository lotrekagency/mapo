<template>
  <v-card v-if="conf" class="my-2 rounded-0">
    <v-card-title :class="conf.group.titleClass" v-if="hasTitle">
      <slot name="title.before" v-bind="slotBindings" />
      <slot name="title" v-bind="slotBindings">
        <v-icon left> {{ conf.group.icon }} </v-icon>
        <span>{{ conf.group.name }}</span>
      </slot>
      <slot name="title.after" v-bind="slotBindings" />
    </v-card-title>
    <div class="container">
      <v-tabs v-model="tabIndex" class="tab-wrapper">
        <v-tab v-for="(tab, index) in conf.tabs" :key="index">
          <v-badge :value="hasErrors(tab)" color="error" dot>
            {{ tab.label }} <v-icon v-if="tab.icon">{{ tab.icon }}</v-icon>
          </v-badge>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabIndex">
        <v-tab-item v-for="(tab, index) in conf.tabs" :key="index" class="pt-8">
          <slot :name="`tab.${tab.slug}`" v-bind="slotBindings">
            <Form
              v-model="model"
              v-bind="{ currentLang, errors, languages, readonly }"
              :fields="tab.fields"
              :moreSlotBindings="slotBindings"
            >
              <template
                v-for="slot in nameSpacedSlots($slots, `tab.${tab.slug}.`)"
                :slot="slot"
              >
                <slot :name="`tab.${tab.slug}.${slot}`"></slot>
              </template>
              <template
                v-for="slot in nameSpacedSlots(
                  $scopedSlots,
                  `tab.${tab.slug}.`
                )"
                v-slot:[slot]="props"
              >
                <slot :name="`tab.${tab.slug}.${slot}`" v-bind="props" />
              </template>
            </Form>
          </slot>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.tab-wrapper {
  margin: -12px 0 0 -12px;
}
</style>
<script>
import { findPropPaths } from "@mapomodule/utils/helpers/objHelpers";
import { nameSpacedSlots } from "@mapomodule/utils/helpers/slots";

export default {
  name: "FormTabs",
  data() {
    return {
      model: {},
      tabIndex: 0,
    };
  },
  props: {
    // V-model of the object we are editing.
    value: {
      type: Object,
      required: true,
    },
    // Set the current lang to value.
    currentLang: {
      type: String,
      required: false,
    },
    // Makes all the fields readonly.
    readonly: Boolean,
    // An object representing all the errors of all fields. This means that this component will find the error of its field following the dottedPath of the value in the error dict.
    errors: Object,
    // Additional bindings to indrease slots capabilities
    moreSlotBindings: Object,
    // The main configuration that determines the arrangement of the fields in the detail layout.
    conf: {
      type: Object,
      required: true,
    },
    // A list of languages into which the payload needs to be translated.
    languages: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    value(val) {
      this.model = val;
    },
    model(val) {
      this.$emit("input", val);
    },
  },
  computed: {
    slotBindings() {
      return {
        model: this.model,
        errors: this.errors,
        currentLang: this.currentLang,
        langs: this.languages,
        ...this.moreSlotBindings,
      };
    },
    hasTitle() {
      return !!(
        Object.keys({ ...this.$scopedSlots, ...this.$slots }).some((s) =>
          s.startsWith("title")
        ) ||
        this.conf.group.name ||
        this.conf.group.icon
      );
    },
  },
  methods: {
    nameSpacedSlots,
    hasErrors(tab) {
      return findPropPaths(this.errors || {}, ({ val }) =>
        Array.isArray(val)
      ).some((k) => tab.fields.some((f) => k.startsWith(f.value)));
    },
  },
  created() {
    this.model = this.value;
  },
};
</script>