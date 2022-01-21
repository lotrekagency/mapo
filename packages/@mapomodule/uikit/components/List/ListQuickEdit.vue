<template>
  <div>
    <slot v-bind="{ on, attrs }" name="activator"></slot>
    <v-dialog v-model="dialog" width="600" scrollable>
      <v-card v-bind="$attrs">
        <v-card-title class="pa-0 mb-3">
          <div style="max-width: calc(100% - 40px)">
            <slot name="lang" v-bind="slotBindings">
              <!-- [`DetailLangSwitch`](/components/detail/DetailLangSwitch/)  -->
              <DetailLangSwitch
                v-if="langs && langs.length > 1"
                v-model="currentLang"
                :langs="langs"
                :errors="errors"
            /></slot>
          </div>
          <v-spacer></v-spacer>
          <slot name="title" v-bind="slotBindings">
            <v-icon class="mr-4">{{
              isNew ? "mdi-plus-circle-outline" : "mdi-pencil-outline"
            }}</v-icon>
          </slot>
        </v-card-title>
        <v-card-text class="pa-0 px-2">
          <v-container>
            <v-form v-if="model" ref="form">
              <!-- Use this to add content on top of body. -->
              <slot name="body.top" v-bind="slotBindings"></slot>

              <slot name="body" v-bind="slotBindings">
                <v-row>
                  <div
                    class="col-12"
                    :class="field.class"
                    v-for="(field, index) in computedFields"
                    :key="index"
                  >
                    <v-card v-if="field.group" class="my-2">
                      <v-card-title>
                        <v-icon left> {{ field.group.icon }} </v-icon>
                        <span>{{ field.group.name }}</span>
                      </v-card-title>
                      <div class="container">
                        <div class="row">
                          <div
                            v-for="(fields, fieldsI) in field.fields"
                            :key="fieldsI"
                            class="col-12"
                            :class="fields.class"
                          >
                            <!-- This is a dynamic slot. You can use it to override a field component. For example use `qedit.fields.title` to override the component of the field with value `title`. -->
                            <slot
                              :name="fields.slotName"
                              v-bind="{
                                conf: fields,
                                ...slotBindings,
                              }"
                            >
                              <!-- A [`DetailField`](/components/detail/DetailField/) configured by a [`FieldConfiguration`](#fieldconfiguration). -->
                              <DetailField
                                v-model="model"
                                :conf="fields"
                                :errors="errors"
                              />
                            </slot>
                          </div>
                        </div>
                      </div>
                    </v-card>
                    <slot
                      v-else
                      :name="field.slotName"
                      v-bind="{
                        conf: field,
                        ...slotBindings,
                      }"
                    >
                      <DetailField
                        v-model="model"
                        :conf="field"
                        :errors="errors"
                      />
                    </slot>
                  </div>
                </v-row>
              </slot>
              <!-- Use this to add content under the main body. -->
              <slot name="body.bottom" v-bind="slotBindings"></slot>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <slot name="actions" v-bind="slotBindings">
            <v-spacer></v-spacer>
            <v-btn text @click="close()"> Cancel </v-btn>
            <v-btn text @click="save"> Save </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { diffObjs, deepClone } from "@mapomodule/utils/helpers/objHelpers";
/**
 * This components renders a dialog that let the user quick edit (or add) an element of the list.
 * The dialog provides several fields that will edit a payload that will be sent to the server. <br>
 * The component checks for editFields config or dedicated slots to decide if it should be available to the user.
 */
export default {
  name: "ListQuickEdit",
  data() {
    return {
      dialog: false,
      attrs: { ...this.$attrs },
      modelBkp: null,
      model: null,
      isNew: false,
      currentLang: null,
      errors: null,
      on: {
        click: (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.dialog = !this.dialog;
        },
      },
    };
  },
  props: {
    // V-model
    value: {
      type: Boolean,
    },
    // The main configuration that determines the arrangement of the fields in the detail layout.
    editFields: {
      type: Array,
      default: () => [],
    },
    // A list of languages into which the payload needs to be translated.
    languages: {
      type: Array,
      default: () => [],
    },
    lookup: {
      type: String,
      default: "id",
    },
    crud: {
      type: Object,
      required: true,
    },
    offline: Boolean,
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
      this.$emit(val ? "open" : "close");
      if (!val) {
        this.close();
      }
    },
    currentLang() {
      this.initLang();
    },
  },
  computed: {
    computedFields() {
      return this.mapConf(this.editFields || []);
    },
    langs() {
      return (
        this.model?.active_languages?.languages.map((l) => l.id) ||
        this.languages
      );
    },
    loading() {
      return this.isNew ? false : !Object.keys(this.model || {}).length;
    },
    slotBindings() {
      return {
        model: this.model,
        currentLang: this.currentLang,
        crud: this.crud,
        isNew: this.isNew,
        langs: this.langs,
        loading: this.loading,
        form: this.$refs.form,
        save: this.save,
        close: this.close,
      };
    },
  },
  methods: {
    async open(item) {
      this.isNew = !item;
      this.modelBkp = await this.fetchItem(item);
      this.model = deepClone(this.modelBkp);
      this.initLang();
      this.dialog = true;
      this.$refs.form?.resetValidation();
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    async save() {
      if (this.$refs.form?.validate()) {
        return await (this.isNew ? this.apiCreate() : this.apiEdit());
      }
    },
    close(res) {
      this.errors = null;
      this.currentLang = null;
      this.$refs.form?.resetValidation();
      this.resolve && this.resolve(res);
      this.dialog = false;
    },
    parseConf(field, i) {
      const conf = typeof field === "string" ? { value: field } : field;
      conf.value = conf.value || "";
      conf.value = conf.value.replace(
        new RegExp(`^translations\.(${this.languages.join("|")})\.?`),
        ""
      );
      conf.slotName = `fields.${conf.value || i}`;
      if (this.currentLang && !field.synci18n) {
        const base = `translations.${this.currentLang}`;
        conf.value = (conf.value && `${base}.${conf.value}`) || base;
      }
      return conf;
    },
    mapConf(fields) {
      const icon = "mdi-cube-outline";
      const parseGroup = (group) =>
        typeof group === "string"
          ? { name: group, icon }
          : { ...group, icon: group.icon || icon };
      return fields.map((f, i) =>
        f.group
          ? { group: parseGroup(f.group), fields: this.mapConf(f.fields) }
          : this.parseConf(f, i)
      );
    },
    initLang(lang = this.currentLang) {
      if (lang && !this.model.translations) {
        this.model.translations = {};
      }
      if (lang && !this.model.translations[lang]) {
        this.model.translations[lang] = {};
      }
    },
    async fetchItem(item) {
      if (!this.offline && item && item[this.lookup]) {
        return await this.crud.detail(item[this.lookup]);
      } else {
        return item;
      }
    },
    apiEdit() {
      if (!this.offline) {
        return this.crud
          .partialUpdate(
            this.modelBkp[this.lookup],
            diffObjs(this.modelBkp, this.model)
          )
          .then((res) => this.close(res))
          .catch(this.handleError);
      } else {
        this.close(this.model);
      }
    },
    apiCreate() {
      if (!this.offline) {
        return this.crud
          .create(this.model)
          .then((res) => this.close(res))
          .catch(this.handleError);
      } else {
        return this.close(this.model);
      }
    },
    handleError(error) {
      const badRequest = error.response.status == 400;
      this.errors = (badRequest && error.response.data) || null;
      this.$mapo.$snack.open({
        message: badRequest
          ? "Bad input, correct wrong fields."
          : "Something whent bad, please try again later...",
        color: "error",
      });
    },
  },
};
</script>
