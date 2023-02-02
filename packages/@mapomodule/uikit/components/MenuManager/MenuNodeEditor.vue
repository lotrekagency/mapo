<template>
  <div>
    <div class="tools internal">
      <h5>{{ $t("editNode") }}</h5>
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="$emit('delete')">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("deleteNode") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="model = null">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("close") }}</span>
        </v-tooltip>
      </div>
    </div>

    <Form
      v-model="model"
      :currentLang="lang"
      :languages="languages"
      :errors="model.errors"
      :fields="fields"
      :moreSlotBindings="slotBindings"
      :readonly="readonly"
      class="pa-4"
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
  </div>
</template>

<style scoped>
.tools {
  background-color: var(--v-primary-base);
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    availableClasses: {
      type: Object,
      default: () => ({}),
    },
    coreFields: {
      type: Array | null,
    },
    additionalFields: {
      type: Array,
      default: () => [],
    },
    // Set the current lang to value.
    lang: {
      type: String,
      required: false,
    },
    languages: {
      type: Array,
      default() {
        return this.$mapo.$options?.content?.languages || [];
      },
    },
    readonly: Boolean,
    menuEndpoint: String,
  },
  data() {
    return {
      model: this.value,
      availablePages: [],
    };
  },
  watch: {
    value(val) {
      this.model = val;
      this.loadPages();
    },
    model(val) {
      this.$emit("input", val);
    },
  },
  computed: {
    fields() {
      return [
        ...(this.coreFields || this.defaultCoreFields),
        ...this.additionalFields,
      ];
    },
    pageTypesEndpoint() {
      return `${this.menuEndpoint.replace(/\/$/, "")}/page_types`;
    },
    slotBindings() {
      return {
        model: this.model,
        errors: this.model.errors,
        currentLang: this.lang,
      };
    },
    defaultCoreFields() {
      return [
        { value: "title", class: "col-md-6", synci18n: true },
        { value: "meta.xfn", class: "col-md-6", synci18n: true },
        {
          value: "link.link_type",
          type: "select",
          class: "col-md-4",
          synci18n: true,
          attrs: {
            items: [
              { text: this.$t("relational"), value: "RE" },
              { text: this.$t("static"), value: "ST" },
            ],
          },
        },
        {
          value: "meta.style",
          type: "select",
          class: "col-md-4",
          synci18n: true,
          attrs: {
            items: Object.keys(this.availableClasses).map((text) => ({
              text,
              value: this.availableClasses[text],
            })),
          },
        },
        {
          label: this.$t("openInNewTab"),
          value: "meta.target_bank",
          class: "col-md-4",
          type: "switch",
          synci18n: true,
        },
        {
          value: "link.relational.content_type",
          vShow: ({ model }) => model.link.link_type == "RE",
          onChange: this.loadPages,
          class: "col-md-6",
          type: "fks",
          synci18n: true,
          attrs: {
            multiple: false,
            returnObject: false,
            itemText: "verbose_name_plural",
            endpoint: this.pageTypesEndpoint,
          },
        },
        {
          value: "link.relational.page_id",
          vShow: ({ model }) => model.link.link_type == "RE",
          class: "col-md-6",
          type: "select",
          synci18n: true,
          attrs: {
            items: this.availablePages?.map((item) => ({
              text: item.name,
              value: item.id,
            })),
          },
        },
        {
          value: "link.static",
          vShow: ({ model }) => model.link.link_type == "ST",
          synci18n: true,
        },
      ];
    },
  },
  mounted() {
    this.loadPages();
  },
  methods: {
    async loadPages() {
      const { content_type } = this.model?.link?.relational || {};
      if (content_type) {
        const options = { params: { language_code: this.lang } };
        this.availablePages = await this.$mapo.$api
          .crud(this.pageTypesEndpoint)
          .detail(content_type, options);
      } else {
        this.availablePages = [];
      }
    },
  },
};
</script>
