<template>
  <div>
    <slot v-bind="{ on, attrs }" name="activator"></slot>
    <v-dialog v-model="dialog" v-bind="dialogProps">
      <v-card v-bind="$attrs">
        <v-card-title class="pa-0 mb-3">
          <div style="max-width: calc(100% - 40px)">
            <slot name="lang" v-bind="slotBindings">
              <!-- [`DetailLangSwitch`](/components/detail/DetailLangSwitch/)  -->
              <DetailLangSwitch
                v-if="langs.length > 1"
                v-model="currentLang"
                :langs="langs"
                :errors="errors"
            /></slot>
          </div>
          <v-spacer></v-spacer>
          <slot name="title" v-bind="slotBindings">
            <v-hover v-slot="{ hover }">
              <v-icon @click="hover && close()" class="mr-4" :class="{'mt-4': !langs.length}">{{
                hover ? "mdi-close" : isNew ? "mdi-plus-circle-outline" : "mdi-pencil-outline"
              }}</v-icon>
            </v-hover>
          </slot>
        </v-card-title>
        <v-card-text class="pa-0 px-2">
          <v-container>
            <v-form v-if="model" ref="form">
              <!-- Use this to add content on top of body. -->
              <slot name="body.top" v-bind="slotBindings"></slot>

              <slot name="body" v-bind="slotBindings">
                <Form
                  v-model="model"
                  :currentLang="currentLang"
                  :languages="langs"
                  :errors="errors"
                  :fields="editFields"
                  :modeSlotBindings="slotBindings"
                >
                  <template v-for="(_, slot) in $slots" :slot="slot">
                    <!-- @vuese-ignore -->
                    <slot :name="slot"></slot>
                  </template>
                  <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
                    <!-- @vuese-ignore -->
                    <slot :name="slot" v-bind="props" />
                  </template>
                </Form>
              </slot>
              <!-- Use this to add content under the main body. -->
              <slot name="body.bottom" v-bind="slotBindings"></slot>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-messages v-if="nonFieldErrors.length" v-model="nonFieldErrors" color="error"></v-messages>
          <slot name="actions" v-bind="slotBindings">
            <v-spacer></v-spacer>
            <v-btn text @click="close()">{{ $t("mapo.cancel") }}</v-btn>
            <v-btn text @click="save">{{ $t("mapo.save") }}</v-btn>
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
    dialogProps: {
      type: Object,
      required: false,
      default: () => ({ width: 600, scrollable: true })
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
  },
  computed: {
    langs() {
      return this.model?.lang_info?.site_languages.map((l) => l.id) || this.languages || [];
    },
    loading() {
      return this.isNew ? false : !Object.keys(this.model || {}).length;
    },
    nonFieldErrors(){
      return this.errors?.non_field_errors || []
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
            // diffObjs(this.modelBkp, this.model) disabled since it creates some errors in translations
            this.model
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
          ? this.$t("mapo.listQuickEdit.badInput")
          : error.response?.data?.detail || this.$t("mapo.genericError"),
        color: "error",
      });
    },
  },
};
</script>
