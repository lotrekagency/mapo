<template>
  <div class="menu-node-editor--wrapper">
    <div class="menu-node-editor--topbar">
      <h5 class="menu-node-editor--breadcrumbs">
        <span class="menu-node-editor--breadcrumbs-title"
          >{{ $t("mapo.menuNodeEditor.editNode") }}:</span
        >
        <template v-for="(node, i) in parents">
          <span
            :key="`i${i}`"
            class="menu-node-editor--breadcrumbs-item"
            @click="model = node"
            >{{ node.title }}</span
          >
          <span
            :key="`d${i}`"
            class="menu-node-editor--breadcrumbs-divider"
            v-if="i != parents.length - 1"
          >
            >
          </span>
        </template>
      </h5>
      <div>
        <v-btn tile color="error" @click="$emit('delete')">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>

    <Form
      v-model="model"
      class="menu-node-editor--form"
      :currentLang="lang"
      :languages="languages"
      :errors="model.errors"
      :fields="fields"
      :moreSlotBindings="slotBindings"
      :readonly="readonly"
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
.menu-node-editor--topbar {
  background-color: var(--v-primary-base);
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.menu-node-editor--breadcrumbs-item {
  cursor: pointer;
}
.menu-node-editor--breadcrumbs-title,
.menu-node-editor--breadcrumbs-divider {
  color: var(--v-primary-darken3);
}
.menu-node-editor--form {
  margin: 20px 0;
}
</style>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    nodes: {
      type: Array,
      default: () => [],
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
    parents() {
      let find = (nodes, parents = []) => {
        let node = nodes.find(({ id }) => id == this.model.id);
        return node
          ? [...parents, node]
          : nodes
              .filter(({ nodes }) => nodes.length)
              .reduce((acc, node) => {
                return acc.length ? acc : find(node.nodes, [...parents, node]);
              }, []);
      };
      return find(this.nodes);
    },
    defaultCoreFields() {
      return [
        {
          value: "title",
          label: this.$t("mapo.menuNodeEditor.title"),
          synci18n: true,
        },
        {
          value: "link.link_type",
          label: this.$t("mapo.menuNodeEditor.linkTypeLabel"),
          type: "select",
          class: "col-md-4",
          synci18n: true,
          attrs: {
            items: [
              { text: this.$t("mapo.menuNodeEditor.relational"), value: "RE" },
              { text: this.$t("mapo.menuNodeEditor.static"), value: "ST" },
            ],
          },
        },
        {
          value: "meta.style",
          label: this.$t("mapo.menuNodeEditor.styleLabel"),
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
          value: "meta.target_bank",
          label: this.$t("mapo.menuNodeEditor.openInNewTabLabel"),
          class: "col-md-4",
          type: "switch",
          synci18n: true,
        },
        {
          value: "link.relational.content_type",
          label: this.$t("mapo.menuNodeEditor.relContentTypeLabel"),
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
          label: this.$t("mapo.menuNodeEditor.relPageIdLabel"),
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
          label: this.$t("mapo.menuNodeEditor.staticLabel"),
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
