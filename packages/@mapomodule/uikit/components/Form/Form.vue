<template>
  <div class="row">
    <div
      class="col-12"
      :class="field.class"
      v-for="(field, index) in computedFields"
      :key="index"
      v-show="show(field)"
      :style="show(field, 'visibility') ? '' : 'opacity: 0; visibility: hidden;'"
    >
    <FormTabs
        v-if="field.tabs"
        v-model="model"
        v-bind="{ currentLang, errors, languages, readonly }"
        :conf="field"
        :moreSlotBindings="slotBindings"
      >
        <template
          v-for="slot in nameSpacedSlots($slots, `group.${field.group.slug}.`)"
          :slot="slot"
        >
          <slot :name="`group.${field.group.slug}.${slot}`"></slot>
        </template>
        <template
          v-for="slot in nameSpacedSlots($scopedSlots, `group.${field.group.slug}.`)"
          v-slot:[slot]="props"
        >
          <slot :name="`group.${field.group.slug}.${slot}`" v-bind="props" />
        </template>
      </FormTabs>
      <FormGroup
        v-else-if="field.group"
        v-model="model"
        v-bind="{ currentLang, errors, languages, readonly }"
        :conf="field"
        :moreSlotBindings="slotBindings"
      >
        <template
          v-for="slot in nameSpacedSlots($slots, `group.${field.group.slug}.`)"
          :slot="slot"
        >
          <slot :name="`group.${field.group.slug}.${slot}`"></slot>
        </template>
        <template
          v-for="slot in nameSpacedSlots($scopedSlots, `group.${field.group.slug}.`)"
          v-slot:[slot]="props"
        >
          <slot :name="`group.${field.group.slug}.${slot}`" v-bind="props" />
        </template>
      </FormGroup>

      <template v-else>
        <slot :name="field.slotName + '.before'" v-bind="{ conf: field, ...slotBindings, }" />
        <slot
          :name="field.slotName"
          v-bind="{ conf: field, ...slotBindings, }"
        >
          <FormField
            v-model="model"
            v-bind="{ currentLang, errors, readonly }"
            :langs="languages"
            :conf="field"
          >
            <template
              v-for="slot in nameSpacedSlots($slots, `fields.${field.value}.`)"
              :slot="slot"
            >
              <slot :name="`fields.${field.value}.${slot}`"></slot>
            </template>
            <template
              v-for="slot in nameSpacedSlots($scopedSlots, `fields.${field.value}.`)"
              v-slot:[slot]="props"
            >
              <slot :name="`fields.${field.value}.${slot}`" v-bind="props" />
            </template>
          </FormField>
        </slot>
        <slot :name="field.slotName + '.after'" v-bind="{ conf: field, ...slotBindings, }" />
      </template>
    </div>
  </div>
</template>
<script>
import { nameSpacedSlots } from "@mapomodule/utils/helpers/slots";
import { slugify, titleCase } from "@mapomodule/utils/helpers/formatters";
import { debounce } from "@mapomodule/utils/helpers/debounce";

export default {
  name: "Form",
  data() {
    return {
      model: this.value,
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
    fields: {
      // [`DetailConfiguration`](#detailconfiguration)
      type: Object | Array,
      required: true,
    },
    // A list of languages into which the payload needs to be translated.
    languages: {
      type: Array,
      default() { return this.$mapo.$options?.content?.languages || []; },
    },
    // Removes debounce from the emitter.
    immediate: Boolean
  },
  watch: {
    value(val) {
      if (JSON.stringify(this.model) !== JSON.stringify(val)){
        this.model = val;
        this.initLang();
      }
    },
    model(val) {
      this.immediate ? this.$emit("input", val) : this.debouncedEmit("input", val);
    },
  },
  methods: {
    debouncedEmit: debounce(function (...args) {
      this.$emit(...args);
    }, 300),
    nameSpacedSlots,
    initLang(lang = this.currentLang) {
      if (lang && !this.model.translations) {
        this.model.translations = {};
      }
      if (lang && !this.model.translations[lang]) {
        this.model.translations[lang] = {};
      }
    },
    parseConf(field, i) {
      const conf = typeof field === "string" ? { value: field } : { ...field };
      conf.value = conf.value || "";
      conf.slotName = `fields.${conf.value || i}`;
      if (this.isReadonly) {
        conf.attrs = { ...conf.attrs, readonly: true };
      }
      return conf;
    },
    parseGroup(group, icon="mdi-cube-outline") {
      return typeof group === "string"
        ? { name: group, slug: slugify && slugify(group), icon }
        : { slug: slugify && slugify(group.name), icon, ...group };
    },
    parseTabs(tabs) {
      return Object.keys(tabs).map(key => {
        const tab = tabs[key]
        return {
          tab: {label: titleCase(key.replace(/_/, " ")), slug: key, ...tab.tab},
          fields: this.mapConf(Array.isArray(tab) && tab || tab.fields || [])
        }
      })
    },
    parseTagsGroup(field){
      const gType = typeof field.group
      const slug = gType == "string" && slugify(field.group) || gType == "object" && slugify(field.group?.name) || Object.keys(field.tabs).join("-")
      return this.parseGroup(gType == "string" ? { ...this.parseGroup(field.group, null), slug} : { slug,...field.group }, null)
    },
    mapConf(fields) {
      return fields.map((f, i) =>
        f.tabs
          ? { ...f, group: this.parseTagsGroup(f), tabs: this.parseTabs(f.tabs) }
          : f.group
            ? { ...f, group: this.parseGroup(f.group), fields: this.mapConf(f.fields) }
            : this.parseConf(f, i)
      );
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
    computedFields() {
      return this.mapConf(this.fields);
    },
  },
  created(){
    this.initLang();
  }
};
</script>
