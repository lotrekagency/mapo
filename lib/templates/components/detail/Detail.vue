<template>
  <v-container>
    <slot name="title" v-bind="slotBindings">
      <v-row class="mb-14">
        <h1>{{ isNew ? "Create" : "Edit" }} {{ modelName }}</h1>
      </v-row>
    </slot>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="8">
          <slot name="body.top" v-bind="slotBindings"></slot>
          <slot name="body.lang" v-bind="slotBindings">
            <DetailLangSwitch
              v-if="langs && langs.length"
              class="mb-4"
              v-model="currentLang"
              :langs="langs"
              :errors="errors"
          /></slot>
          <slot name="body.top.underlang" v-bind="slotBindings"></slot>
          <slot name="body" v-bind="slotBindings">
            <div v-for="(field, index) in mainFields" :key="index">
              <v-card v-if="field.group" class="my-2">
                <v-card-title>
                  <v-icon left> {{ getGroupIcon(field.group) }} </v-icon>
                  <span>{{ getGroupName(field.group) }}</span>
                </v-card-title>
                <v-card-text>
                  <div
                    v-for="(subField, subI) in field.fields"
                    :key="subI"
                    class="mb-4"
                  >
                    <slot
                      :name="`field.${parseConf(subField, false).value}`"
                      v-bind="{
                        conf: parseConf(subField),
                        ...slotBindings,
                      }"
                    >
                      <DetailField
                        v-model="model"
                        :conf="parseConf(subField)"
                        :errors="errors"
                      />
                    </slot>
                  </div>
                </v-card-text>
              </v-card>
              <slot
                v-else
                :name="`field.${parseConf(field, false).value}`"
                v-bind="{
                  conf: parseConf(field),
                  ...slotBindings,
                }"
              >
                <DetailField
                  v-model="model"
                  :conf="parseConf(field)"
                  :errors="errors"
                />
              </slot>
            </div>
          </slot>
          <slot name="body.bottom" v-bind="slotBindings"></slot>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex flex-column" :style="stickySide">
            <slot name="side.buttons.top" v-bind="slotBindings"></slot>

            <slot name="side.buttons" v-bind="slotBindings">
              <div class="mt-4 mt-md-0 mb-md-4 mb-0 order-1 order-md-0">
                <slot name="button.save" v-bind="slotBindings">
                  <v-btn class="mb-2" tile block @click="saveItem(true)">{{
                    isNew ? "Create" : "Save"
                  }}</v-btn>
                </slot>
                <slot name="button.savecontinue" v-bind="slotBindings">
                  <v-btn class="mb-2" tile block @click="saveItem(false)"
                    >{{ isNew ? "Create" : "Save" }} and continue</v-btn
                  >
                </slot>
                <slot name="button.back" v-bind="slotBindings">
                  <v-btn class="mb-2" tile block @click="$router.back()"
                    >Back</v-btn
                  >
                </slot>
                <slot name="button.delete" v-bind="slotBindings">
                  <v-btn
                    v-if="!isNew"
                    class="mb-2"
                    color="error"
                    tile
                    block
                    @click="deleteItem"
                    >Delete</v-btn
                  >
                </slot>
              </div>
            </slot>
            <slot name="side.top" v-bind="slotBindings"></slot>
            <div v-for="(field, index) in sideFields" :key="index">
              <v-card v-if="field.group" class="mb-4">
                <v-card-title>
                  <v-icon left> {{ getGroupIcon(field.group) }} </v-icon>
                  <span>{{ getGroupName(field.group) }}</span>
                </v-card-title>
                <v-card-text>
                  <div
                    v-for="(subField, subI) in field.fields"
                    :key="subI"
                    class="mb-4"
                  >
                    <slot
                      :name="`field.${parseConf(subField, false).value}`"
                      v-bind="{
                        conf: parseConf(subField),
                        ...slotBindings,
                      }"
                    >
                      <DetailField
                        v-model="model"
                        :conf="parseConf(subField)"
                        :errors="errors"
                      />
                    </slot>
                  </div>
                </v-card-text>
              </v-card>
              <slot
                v-else
                :name="`field.${parseConf(field, false).value}`"
                v-bind="{
                  conf: parseConf(field),
                  ...slotBindings,
                }"
              >
                <DetailField
                  v-model="model"
                  :conf="parseConf(field)"
                  :errors="errors"
                />
              </slot>
            </div>
            <slot name="side.bottom" v-bind="slotBindings"></slot>
          </div>
        </v-col>
      </v-row>
    </v-form>

    <confirm-dialog
      v-bind="{ ...$attrs, value: false }"
      question="Are you sure you want to delete this item?"
      ref="delModal"
    ></confirm-dialog>
  </v-container>
</template>


<script>
export default {
  name: "Detail",
  data() {
    return {
      model: {},
      currentLang: null,
      errors: null
    };
  },
  props: {
    fields: {
      type: Object | Array
    },
    languages: Array,
    endpoint: String,
    identifier: String | Number,
    modelName: String,
    sticky: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getGroupName(group) {
      return group instanceof Object ? group.name : group;
    },
    getGroupIcon(group) {
      return group instanceof Object ? group.icon : "mdi-cube-outline";
    },
    saveItem(back = false) {
      this.errors = null;
      this.$refs.form?.resetValidation();
      this.crud
        .updateOrCreate(this.model)
        .then(() => back && this.$router.back())
        .catch(error => {
          this.errors = error.response.status == 400 && error.response.data || null;
          this.$mapo.$snack.open({
            message: "Something whent bad, please try again later...",
            color: "error"
          });
        });
    },
    deleteItem() {
      this.$refs.delModal.open().then(res => {
        if (res) {
          this.crud
            .delete(this.identifier)
            .then(() => this.$router.back())
            .catch(error =>
              this.$mapo.$snack.open({
                message: "Something whent bad, please try again later...",
                color: "error"
              })
            );
        }
      });
    },
    parseConf(field, translate = true) {
      const val = typeof field === "string" ? { value: field } : field;
      return translate ? this.getTranslatedField(val) : val;
    },
    getTranslatedField(field) {
      if (!this.currentLang || field.synci18n) {
        return field;
      }
      return {
        ...field,
        value: `translations.${this.currentLang}.${field.value}`
      };
    }
  },
  watch: {
    currentLang(val) {
      if (val && !this.model.translations) {
        this.model.translations = {};
      }
      if (val && !this.model.translations[val]) {
        this.model.translations[val] = {};
      }
    }
  },
  computed: {
    crud() {
      return this.$mapo.$api.crud(this.endpoint);
    },
    mainFields() {
      return this.fields instanceof Array
        ? this.fields
        : this.fields.main || [];
    },
    sideFields() {
      return (this.fields instanceof Object && this.fields.sidenav) || [];
    },
    isNew() {
      return this.identifier && this.identifier == "new";
    },
    loading() {
      if (this.identifier === "new") {
        return false;
      }
      return !Object.keys(this.model).length;
    },
    langs() {
      return (
        this.model?.active_languages?.languages.map(l => l.id) || this.languages
      );
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
        saveItem: this.saveItem,
        deleteItem: this.deleteItem
      };
    },
    stickySide() {
      return this.sticky
        ? {
            position: "sticky",
            top: "60px"
          }
        : {};
    }
  },
  mounted() {
    if (this.identifier && this.identifier !== "new") {
      this.crud.detail(this.identifier).then(res => (this.model = res));
    }
  }
};
</script>