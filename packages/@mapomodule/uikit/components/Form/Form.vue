<template>
  <div class="row">
    <div
      ref="nodes"
      class="col-12"
      :class="field.class"
      v-for="(field, index) in computedFields"
      :data-id="index"
      :key="index"
      v-show="show(field)"
      :style="(show(field, 'visibility') ? '' : 'opacity: 0; visibility: hidden;') + (inViewEl(index).style || '')"
    >
    <div v-if="inViewEl(index).isHidden" class="render-placeholder"></div>
    <FormTabs
        v-else-if="field.tabs"
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

      <div v-else>
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
      </div>
    </div>
  </div>
</template>
<script>
import { nameSpacedSlots } from "@mapomodule/utils/helpers/slots";
import { slugify, titleCase } from "@mapomodule/utils/helpers/formatters";
import { deepClone } from "@mapomodule/utils/helpers/objHelpers";

export default {
  name: "Form",
  data() {
    return {
      model: {},
      internalFields: [],
      // ** Experimental: intersection observer conditional rendering **
      observer: null,
      inViewMap: {},
      // ** End of Experimental **
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
      default: () => [],
    },
  },
  watch: {
    value(val) {
      this.model = val;
      this.initLang();
    },
    model(val) {
      if (this.value !== val)
        this.$emit("input", val);
    },
    fields(val){
      this.internalFields = this.cloneFields(val)
    }
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
          ? { group: this.parseTagsGroup(f), tabs: this.parseTabs(f.tabs) }
          : f.group
            ? { group: this.parseGroup(f.group), fields: this.mapConf(f.fields) }
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
    cloneFields(fields){
      return process.browser ? deepClone(fields) : fields
    },
    // ** Experimental: intersection observer conditional rendering **
    inViewEl(index){
      if (this.inViewMap[index]?.boundingClientRect){
        const { height } = this.inViewMap[index].boundingClientRect
        this.inViewMap[index].style = `min-height: ${height}px;`
      }
      return this.inViewMap[index] || {}
    },
    initObserver(){
      let observer = new IntersectionObserver(this.handleIntersection);
      for (let node of this.$refs.nodes) {
        observer.observe(node);
      }
      this.observer = observer;
    },
    updateObserver(){
      if (this.observer){
        for (let node of this.$refs.nodes) {
            this.observer.unobserve(node);
            this.observer.observe(node);
        }
      }
    },
    handleIntersection(entries, observer) {
      const dump = {...this.inViewMap}
      for (let entry of entries) {
        let { id } = entry.target.dataset;
        if (entry.isIntersecting) {
          let { isIntersecting, boundingClientRect } = entry;
          dump[id] = { isHidden: !isIntersecting, boundingClientRect }
        } else if (dump[id]) {
          dump[id].isHidden = true;
        }
      }
      this.inViewMap = dump;
    },
    // ** End of Experimental **
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
      return this.mapConf(this.internalFields);
    },
  },
  // ** Experimental: intersection observer conditional rendering **
  beforeDestroy() { this.observer.disconnect() },
  // updated(){ this.updateObserver() },
  mounted(){ this.initObserver() },
  // ** End of Experimental **
  created(){
    this.internalFields = this.cloneFields(this.fields)
    this.model = this.value
    this.initLang();
  }
};
</script>
