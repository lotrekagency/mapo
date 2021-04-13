<template>
  <div>
    <media-manager-dialog ref="mediaManager"></media-manager-dialog>
    <div ref="editorNode">
      <h3 class="tinymce-loading">Loading text editor..</h3>
      <v-skeleton-loader
        type="table-heading, list-item-two-line, list-item-avatar-two-line, list-item-three-lineimage, table-tfoot"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import initMapoMedia from "~mapomodule/components/fields/tinymce/utils/mapomedia.plugin.js";
import injectScript from "~mapomodule/components/fields/tinymce/utils/script.injector.js";
import defaults from "~mapomodule/components/fields/tinymce/defaults.js";
import { validEvents } from "~mapomodule/components/fields/tinymce/utils/events.js";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    conf: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    bindevents: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      editorInstance: null,
      editorContent: "",
    };
  },

  computed: {
    editor: {
      cache: false,
      get() {
        return this.editorInstance;
      },
    },
  },

  mounted() {
    injectScript().then(this.initEditor);
  },

  methods: {
    initEditor() {
      initMapoMedia(this.insertImgCallback);
      window.tinymce.init(
        Object.assign(defaults, this.conf, {
          target: this.$refs.editorNode,
          readonly: this.disabled,
          setup: (ctx) => this.setupEditor(ctx),
        })
      );
    },
    setupEditor(editor) {
      this.editorInstance = editor;
      editor.on("init", () => {
        editor.setContent(this.value || "");
        this.emitContent(editor);
        editor.on("change input undo redo keyup", () =>
          this.emitContent(editor)
        );
      });
      this.bindEvents(editor);
    },
    emitContent(editor) {
      this.editorContent = editor.getContent();
      this.$emit("input", this.editorContent);
    },
    bindEvents(editor) {
      if (this.bindevents) {
        validEvents.forEach((eventName) => {
          editor.on(eventName, (event) => this.$emit(eventName, event));
        });
      }
    },
    insertImgCallback: async function () {
      return new Promise((resolve, reject) => {
        this.$refs.mediaManager
          .open()
          .then((result) =>
            result
              ? resolve(`<img width="50%" src="${result.file}">`)
              : reject("No image selected")
          )
          .catch((error) => reject(error));
      });
    },
  },
  beforeDestroy() {
    window && window.tinymce && window.tinymce.remove(this.editor);
  },
  watch: {
    value(val) {
      if (this.editor && this.editor.initialized && val !== this.editorContent) {
        this.editorContent = val
        this.editor.setContent(val);
      }
    },
    disabled(val) {
      if (this.editor && this.editor.initialized) {
        this.editor.setMode(val ? "readonly" : "design");
      }
    },
  },
};
</script>

<style>
.tox-notifications-container,
.tox-statusbar__branding {
  display: none;
}
.tinymce-loading {
  position: absolute;
  z-index: 1;
  width: calc(100% - 30px);
  text-align: center;
  margin-top: 115px;
}
</style>