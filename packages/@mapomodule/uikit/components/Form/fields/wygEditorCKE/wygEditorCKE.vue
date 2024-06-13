<template>
  <div class="mapo-wyg-editor">
    <media-manager-dialog ref="mediaManager"></media-manager-dialog>
    <span
      v-if="label"
      class="v-label"
      :class="{ 'error--text': hasErrors, 'text--secondary': !hasErrors }"
      >{{ label }}:</span
    >
    <div ref="ckeditor">
      <v-skeleton-loader
        v-if="!editorLoaded"
        type="table-heading, list-item-two-line, list-item-avatar-two-line, list-item-three-lineimage, table-tfoot"
      ></v-skeleton-loader>
    </div>
    <div class="mt-2">
      <v-messages :value="errorMessages" color="error"></v-messages>
    </div>
  </div>
</template>

<style lang="scss">
.tox-notifications-container,
.tox-statusbar__branding {
  display: none;
}
.v-label.error--text {
  animation: v-shake 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.tox-ckeditor-aux {
  z-index: 200 !important;
}
.mapo-field--has-errors {
  .tox.tox-ckeditor {
    border: solid var(--v-error-base) 2px;
  }
}
</style>

<script>
import injectScript from "./utils/ckeditor.injector.js";
import defaultConfig from "./defaults.js";

/**

*/

export default {
  name: "wygEditorCKE",
  props: {
    // V-model property. Is the content that will populate the wygEditor instance.
    value: {
      type: String,
      default: "",
    },
    // This is the main configuration of wygEditor. If setted will be merged with this component defaults.
    conf: {
      type: Object,
      default: () => ({}),
    },
    // This label will be shown at the top of the editor.
    label: String,
    // This is an array of validation errors that will be displayed under the editor.
    errorMessages: Array,
    // This set the component status to readonly, stopping the user interaction.
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      editorInstance: null,
      editorContent: this.value,
      editorLoaded: false,
    };
  },

  computed: {
    hasErrors () { return this.errorMessages && this.errorMessages.length },
    defaultConfiguration(){
      const { base } = this.$router.options;
      const { isDark } = this.$vuetify.theme;
      return defaultConfig({ base, isDark })
    },
  },

  mounted() {
    injectScript().then(this.initEditor);
  },

  methods: {
    initEditor() {
      this.createEditorInstance();
      this.setupdEditor();
      this.editorInstance.setData(this.value);
      this.editorInstance.on("change", () => {
        const data = this.editorInstance.getData();
        this.$emit("input", data);
      });
    },
    createEditorInstance() {
      CKEDITOR.editorConfig = window.CKEDITOR.editorConfig;
      this.editorInstance = CKEDITOR.replace(this.$refs.ckeditor, {...this.defaultConfiguration});
      this.editorInstance.addCommand("insertMedia", {
        exec: (editor) => {
          this.insertMediaCallback().then((html) => {
            var element = CKEDITOR.dom.element.createFromHtml(html);
            editor.insertElement( element );
          });
        },
      });
      this.editorInstance.ui.addButton("insertMedia", {
        label: "Insert Media",
        command: "insertMedia",
        toolbar: "insert",
        icon: "image",
      });
    },
    setupdEditor() {},
    insertMediaCallback: async function () {
      return new Promise((resolve, reject) => {
        this.$refs.mediaManager
          .open()
          .then((result) => {
            if (result) {
              let html;
              switch (result.mime_type && result.mime_type.split("/")[0]) {
                case "image":
                  html = `<img width="300px" src="${result.file}" alt="${result.alt_text}"/>`;
                  break;
                case "video":
                  html = `<video controls><source src="${result.file}" type="${result.mime_type}"></video>`;
                  break;
                case "audio":
                  html = `<audio controls><source src="${result.file}" type="${result.mime_type}"></audio>`;
                  break;
                default:
                  html = `<a href="${result.file}" target="_blank">${result.file}</a>`;
                  break;
              }
              resolve(html);
            } else {
              reject("No image selected");
            }
          })
          .catch((error) => reject(error));
      });
    },
  },
  beforeDestroy() {
    if (this.editorInstance) {
      this.editorInstance.destroy();
    }
  },
  watch: {
    value(newValue) {
      if (this.editorInstance && newValue !== this.editorInstance.getData()) {
        this.editorInstance.setData(newValue);
      }
    },
    readonly(newValue) {
      if (this.editorInstance) {
        this.editorInstance.setReadOnly(newValue);
      }
    },
  },
};
</script>
