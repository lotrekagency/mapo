<template>
  <div class="row">
    <div
      class="col-12"
      :class="field.class"
      v-for="(field, index) in computedFields"
      :key="index"
    >
    <FormTabs 
        v-if="field.tabs"
        v-model="model"
        v-bind="{ currentLang, errors, languages }"
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
        v-bind="{ currentLang, errors, languages }"
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
      
      <div v-else>
        <slot :name="field.slotName + '.before'" v-bind="{ conf: field, ...slotBindings, }" />
        <slot
          :name="field.slotName"
          v-bind="{ conf: field, ...slotBindings, }"
        >
          <FormField
            v-model="model"
            :langs="languages"
            :currentLang="currentLang"
            :conf="field"
            :errors="errors"
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
      </div>
    </div>
  </div>
</template>
<script>
import { nameSpacedSlots } from "@mapomodule/utils/helpers/slots";
import { titleCase } from "@mapomodule/utils/helpers/formatters";
import { slugify } from "@mapomodule/utils/helpers/formatters";

export default {
  name: "Form",
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
    fields: {
      // [`DetailConfiguration`](#detailconfiguration)
      type: Object | Array,
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
      this.initLang();
    },
    model(val) {
      this.$emit("input", val);
    },
  },
  methods: {
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
      const conf = typeof field === "string" ? { value: field } : field;
      conf.value = conf.value || "";
      conf.value = conf.value.replace(new RegExp(`^translations\.(${this.languages.join("|")})\.?`), "");
      conf.slotName = `fields.${conf.value || i}`;
      if (this.currentLang && !field.synci18n) {
        const base = `translations.${this.currentLang}`;
        conf.value = (conf.value && `${base}.${conf.value}`) || base;
      }
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
          label: titleCase(key.replace(/_/, " ")), 
          slug: key, 
          ...tab.tab, 
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
      fields = JSON.parse(JSON.stringify(fields)) //prevent render loop
      return fields.map((f, i) =>
        f.tabs
          ? { group: this.parseTagsGroup(f), tabs: this.parseTabs(f.tabs) } 
          : f.group
            ? { group: this.parseGroup(f.group), fields: this.mapConf(f.fields) }
            : this.parseConf(f, i)
      );
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
    this.model = this.value
    this.initLang();
  }
};
</script>