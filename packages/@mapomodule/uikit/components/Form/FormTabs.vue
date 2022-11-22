<template>
  <v-card v-if="conf" class="tabs-card my-2 rounded-0 elevation-0">
    <v-card-title :class="conf.group.titleClass" v-if="hasTitle">
      <slot name="title.before" v-bind="slotBindings" />
      <slot name="title" v-bind="slotBindings">
        <v-icon left> {{ conf.group.icon }} </v-icon>
        <span>{{ conf.group.name }}</span>
      </slot>
      <slot name="title.after" v-bind="slotBindings" />
      <slot name="expandIcon" v-bind="slotBindings">
        <v-icon class="expand-icon" :style="rotate" @click="expanded = !expanded"> mdi-chevron-up </v-icon>
      </slot>
    </v-card-title>
    <div v-if="expanded" class="container">
      <v-tabs v-model="tabIndex" class="tab-wrapper">
        <v-tab v-for="(tab, index) in conf.tabs" :key="index" v-show="show(tab)">
          <v-badge :value="hasErrors(tab)" color="error" dot>
            {{ tab.tab.label }} <v-icon v-if="tab.tab.icon">{{ tab.tab.icon }}</v-icon>
          </v-badge>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabIndex">
        <v-tab-item v-for="(tab, index) in conf.tabs" :key="index" class="pt-8">
          <slot :name="`tab.${tab.tab.slug}`" v-bind="slotBindings">
            <Form
              v-model="model"
              v-bind="{ currentLang, errors, languages, readonly }"
              :fields="tab.fields"
              :moreSlotBindings="slotBindings"
              immediate
            >
              <template
                v-for="slot in nameSpacedSlots($slots, `tab.${tab.tab.slug}.`)"
                :slot="slot"
              >
                <slot :name="`tab.${tab.tab.slug}.${slot}`"></slot>
              </template>
              <template
                v-for="slot in nameSpacedSlots(
                  $scopedSlots,
                  `tab.${tab.tab.slug}.`
                )"
                v-slot:[slot]="props"
              >
                <slot :name="`tab.${tab.tab.slug}.${slot}`" v-bind="props" />
              </template>
            </Form>
          </slot>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.expand-icon{
  margin: 0 0 0 auto;
}
.tab-wrapper {
  margin: -12px 0 0 -12px;
}
.theme--light .tabs-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.tabs-card .v-card__title{
    padding: 6px 16px;
    background: #0000002b;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      background: var(--v-primary-base);
      height: 100%;
      width: 4px;
      left: 0;
    }
}
.theme--light .v-card__title{
    background: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
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
      expanded: true,
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
      if (this.value !== val)
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
    rotate() {
      return {
        transform: this.expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1)",
      };
    },
  },
  methods: {
    nameSpacedSlots,
    hasErrors(tab) {
      return findPropPaths(this.errors || {}, ({ val }) =>
        Array.isArray(val)
      ).some((k) => tab.fields.some((f) => k.startsWith(f.value)));
    },
    show(conf, type = "display"){
      const prop = type == "visibility" ? "vVisible" : "vShow"
      if (typeof conf[prop] == "function") {
        return conf[prop]({
          model: this.model,
          errors: this.errors,
          languages: this.languages,
          currentLang: this.currentLang
          })
      }
      return true
    },
  },
  created() {
    this.model = this.value;
  },
};
</script>
