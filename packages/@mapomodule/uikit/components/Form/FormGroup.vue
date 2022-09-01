<template>
  <v-card v-if="conf" v-show="show(conf.group)" class="my-2 rounded-0 elevation-0 group-card">
    <v-card-title :class="conf.group.titleClass">
      <slot name="title.before" v-bind="slotBindings" />
      <slot name="title" v-bind="slotBindings">
        <v-icon left> {{ conf.group.icon }} </v-icon>
        <span>{{ conf.group.name }}</span>
      </slot>
      <slot name="title.after" v-bind="slotBindings" />
    </v-card-title>
    <div class="container">
      <Form
        v-model="model"
        v-bind="{ currentLang, errors, languages, readonly }"
        :fields="conf.fields"
        :moreSlotBindings="slotBindings"
      >
        <template v-for="(_, slot) in $slots" :slot="slot">
          <!-- @vuese-ignore -->
          <slot :name="slot" />
        </template>
        <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
          <!-- @vuese-ignore -->
          <slot :name="slot" v-bind="props" />
        </template>
      </Form>
    </div>
  </v-card>
</template>
<style lang="scss" scoped>
.theme--light .group-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
<script>
export default {
  name: "FormGroup",
  data() {
    return {
      model: {},
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
    // Makes all the fields readonly.
    readonly: Boolean,
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
  },
  methods: {
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