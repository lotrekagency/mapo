<template>
  <v-container>
    <v-row class="mb-14">
      <h1>{{ isNew ? "Create" : "Edit" }}</h1>
    </v-row>

    <v-form>
      <v-row>
        <v-col cols="12" sm="8">
          <LangSwitch
            v-if="langs && langs.length"
            class="mb-4"
            v-model="currentLang"
            :langs="langs"
            :errors="errors"
          />
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
                  <Field
                    v-model="model"
                    :conf="parseConf(subField)"
                    :errors="errors"
                  />
                </div>
              </v-card-text>
            </v-card>
            <Field
              v-else
              v-model="model"
              :conf="parseConf(field)"
              :errors="errors"
            />
          </div>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="mb-4">
            <v-btn class="mb-2" tile block @click="saveItem(true)">{{
              isNew ? "Create" : "Save"
            }}</v-btn>
            <v-btn class="mb-2" tile block @click="saveItem(false)"
              >{{ isNew ? "Create" : "Save" }} and continue</v-btn
            >
            <v-btn class="mb-2" tile block @click="$router.back()">Back</v-btn>
            <v-btn
              v-if="!isNew"
              class="mb-2"
              color="error"
              tile
              block
              @click="deleteItem"
              >Delete</v-btn
            >
          </div>

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
                  <Field
                    v-model="model"
                    :conf="parseConf(subField)"
                    :errors="errors"
                  />
                </div>
              </v-card-text>
            </v-card>
            <Field
              v-else
              v-model="model"
              :conf="parseConf(field)"
              :errors="errors"
            />
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
  data() {
    return {
      model: {},
      currentLang: null,
      errors: null,
    };
  },
  props: {
    fields: {
      type: Object | Array,
    },
    languages: Array,
    endpoint: String,
    identifier: String | Number,
  },
  methods: {
    getGroupName(group) {
      return group instanceof Object ? group.name : group;
    },
    getGroupIcon(group) {
      return group instanceof Object ? group.icon : "mdi-cube-outline";
    },
    saveItem(back = false) {
      this.crud
        .updateOrCreate(this.model)
        .then(() => back && this.$router.back())
        .catch((error) => {
          this.errors = error.response.status == 400 && error.response.data;
          this.$mapo.$snack.open({
            message: "Something whent bad, please try again later...",
            color: "error",
          });
        });
    },
    deleteItem() {
      this.$refs.delModal.open().then((res) => {
        if (res) {
          this.crud
            .delete(this.identifier)
            .then(() => this.$router.back())
            .catch((error) =>
              this.$mapo.$snack.open({
                message: "Something whent bad, please try again later...",
                color: "error",
              })
            );
        }
      });
    },
    parseConf(field) {
      return this.getTranslatedField(
        typeof field === "string" ? { value: field } : field
      );
    },
    getTranslatedField(field) {
      if (!this.currentLang || field.synci18n) {
        return field;
      }
      return {
        ...field,
        value: `translations.${this.currentLang}.${field.value}`,
      };
    },
  },
  watch: {
    currentLang(val) {
      if (val && !this.model.translations) {
        this.model.translations = {};
      }
      if (val && !this.model.translations[val]) {
        this.model.translations[val] = {};
      }
    },
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
        this.model?.active_languages?.languages.map((l) => l.id) ||
        this.languages
      );
    },
  },
  mounted() {
    if (this.identifier && this.identifier !== "new") {
      this.crud.detail(this.identifier).then((res) => (this.model = res));
    }
  },
};
</script>