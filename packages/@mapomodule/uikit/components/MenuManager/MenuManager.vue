<template>
  <div v-if="model" class="menu-manager--wrapper">
    <v-navigation-drawer
      v-model="mobileOpened"
      :bottom="isMobile"
      :absolute="isMobile"
      :permanent="!isMobile"
    >
      <MenuTreeview
        v-model="selected"
        :nodes.sync="nodes"
        :title="`Menu: ${model.key}`"
        ref="treeview"
      >
        <template v-if="translationsActive" v-slot:treeview.top>
          <DetailLangSwitch
            :langs="languages"
            v-model="currentLang"
            :errors="errors"
          />
        </template>
        <template v-slot:treeview.bottom>
          <v-btn tile @click="save" :loading="loading">
            {{ $t("mapo.save") }}
          </v-btn>
        </template>
      </MenuTreeview>
    </v-navigation-drawer>
    <MenuNodeEditor
      v-if="selected"
      v-model="selected"
      @delete="$refs.treeview.deleteSelectedNode"
      :menu-endpoint="endpoint"
      :nodes="nodes"
      :lang="currentLang"
      :languages="languages"
      :readonly="isReadonly"
      v-bind="$attrs"
    >
      <template v-for="slot in nameSpacedSlots($slots, 'editor.')" :slot="slot">
        <slot :name="`editor.${slot}`"></slot>
      </template>
      <template v-for="slot in nameSpacedSlots($scopedSlots, 'editor.')" v-slot:[slot]="props">
        <slot :name="`editor.${slot}`" v-bind="props" />
      </template>
    </MenuNodeEditor>
    <div class="menu-manager--empty" v-else>
      <v-icon size="60"> mdi-resistor-nodes </v-icon>
      <p>{{ $t("mapo.menuManager.noSelectedNode") }}</p>
    </div>
    <v-btn
      v-if="isMobile"
      class="menu-manager--bottom-btn"
      tile
      block
      @click="save"
      :loading="loading"
    >
      {{ $t("mapo.save") }}
    </v-btn>
    <v-btn
      v-if="isMobile"
      color="primary"
      class="menu-manager--bottom-btn"
      tile
      @click="mobileOpened = !mobileOpened"
      ><v-icon>mdi-menu-open</v-icon></v-btn
    >
  </div>
</template>
<style lang="scss">
.menu-manager--wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  .v-tabs {
    flex: 0;
  }
}
.menu-node-editor--wrapper {
  flex: 1;
  max-width: 100%;
}
.menu-manager--bottom-btn {
  position: absolute;
  bottom: 0;
}
.menu-manager--empty {
  flex: 1;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
}
</style>

<script>
import { diffObjs, deepClone } from "@mapomodule/utils/helpers/objHelpers";
import { nameSpacedSlots } from "@mapomodule/utils/helpers/slots";

export default {
  name: "MenuManager",
  props: {
    // V-model of the object we are editing.
    value: {
      type: Object,
      required: false,
    },
    // Set the current lang to value.
    translatable: {
      type: Boolean,
      default: true,
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
    usePatch: {
      type: Boolean,
      default() {
        return this.$mapo.$options?.content?.usePatch || false;
      },
    },
    endpoint: {
      type: String,
      default: null,
    },
    identifier: {
      // `String|Number`.
      type: String | Number,
      default: "new",
    },
  },
  data() {
    return {
      selected: null,
      mobileOpened: false,
      currentLang: this.lang || this.$i18n.locale,
      loading: false,
      errors: {},
      model: { key: Math.random().toString(36).slice(2) },
      crud: this.$mapo.$api.crud(this.endpoint),
    };
  },
  watch: {
    currentLang(val) {
      // Fired when the current language changes.
      // @arg Emits the language name as a string.
      this.$emit("update:lang", val);
    },
    model(val) {
      // Fired when the v-model changes.
      // @arg Emits the entire payload modified.
      this.$emit("input", val);
    },
    lang(val) {
      if (val && this.languages.includes(val)) {
        this.currentLang = val;
      }
    },
    value(val) {
      if (val) {
        this.model = val;
      }
    },
    currentLang(val) {
      this.selected = null;
    },
  },
  computed: {
    nodes: {
      get() {
        if (this.translationsActive) {
          this.initTranslations();
          return this.model.translations[this.currentLang].nodes;
        } else {
          return this.model.nodes;
        }
      },
      set(val) {
        if (this.translationsActive) {
          this.initTranslations();
          return this.$set(
            this.model.translations[this.currentLang],
            "nodes",
            val
          );
        } else {
          return this.$set(this.model, "nodes", val);
        }
      },
    },
    isNew() {
      return this.identifier && this.identifier == "new";
    },
    isReadonly() {
      if (this.$mapo.$auth.routeMiddlewares.includes("permissions")) {
        return !this.$mapo.$auth.user.permissions.includes(
          this.isNew ? "add" : "change"
        );
      }
      return !!this.buttonClicked;
    },
    translationsActive() {
      return this.translatable && !!this.languages?.length;
    },
    modelDiff() {
      return diffObjs(this.modelBkp, this.model) || {};
    },
    hasDiff() {
      return !!(this.modelDiff && Object.keys(this.modelDiff).length > 0);
    },
    apiSendPayload() {
      let method, args;
      if (!this.model.id) {
        method = this.crud.create;
        args = [this.model];
      } else if (this.usePatch) {
        method = this.crud.partialUpdate;
        args = [this.model.id, this.modelDiff];
      } else {
        method = this.crud.update;
        args = [this.model.id, this.model];
      }
      return async () => method(...args);
    },
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  async mounted() {
    if (this.identifier && this.identifier !== "new") {
      try {
        this.model = await this.crud.detail(this.identifier);
      } catch (error) {
        this.$nuxt.error({
          statusCode: error.response.status,
          message: error.response.data?.detail || this.$t("mapo.genericError"),
        });
      }
    } else if (this.value) {
      this.model = this.value;
    }
    this.modelBkp = deepClone(this.model);
  },
  methods: {
    nameSpacedSlots,
    save() {
      this.errors = null;
      this.loading = true;
      this.apiSendPayload()
        .then((resp) => {
          this.model = resp;
          this.modelBkp = deepClone(this.model);
          this.$mapo.$snack.open({
            message: this.isNew
              ? this.$t("mapo.createSuccess")
              : this.$t("mapo.saveSuccess"),
            color: "success",
          });
          this.isNew && this.$router.replace({ params: { detail: resp.id } });
        })
        .catch((error) => {
          this.errors =
            (error.response?.status == 400 && error.response?.data) || null;
          this.parseErrors(this.errors);
          this.$mapo.$snack.open({
            message:
              error.response?.data?.detail || this.$t("mapo.genericError"),
            color: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    initTranslations() {
      this.model.translations = this.model.translations || {};
      if (!this.model.translations[this.currentLang]) {
        this.model.translations[this.currentLang] = { nodes: [] };
      }
    },

    parseErrors(errors) {
      if (!errors) return;
      const recurse = (node, error, lang = null) => {
        let { nodes, ...nodeErrors } = error || {};
        if (Object.keys(nodeErrors).length > 0) {
          if (this.currentLang == lang || !this.translationsActive) {
            this.selected = node;
            this.$refs?.treeview?.$refs.nodes?.forEach((nodeRef) =>
              nodeRef.openIfChild(node)
            );
          }
          this.$set(node, "errors", nodeErrors);
        }
        let index = 0;
        while (nodes && index < nodes.length) {
          recurse(node.nodes[index], error.nodes[index]);
          index++;
        }
      };
      if (this.translationsActive) {
        Object.keys(errors.translations).forEach((lang) =>
          recurse(
            this.model.translations[lang],
            errors.translations[lang],
            lang
          )
        );
      } else {
        recurse(this.model, errors);
      }
    },
  },
};
</script>
