<template>
  <div>
    <media-manager-dialog ref="mediaManager"></media-manager-dialog>
    <textarea ref="editorNode"></textarea>
  </div>
</template>

<script>
import initMapoMedia from "~mapomodule/components/tinymce/utils/mapomedia.plugin.js";
import injectScript from "~mapomodule/components/tinymce/utils/script.injector.js";
import { fullFeatured } from "~mapomodule/components/tinymce/defaults.js";
import { validEvents } from "~mapomodule/components/tinymce/utils/events.js";

export default {
  props: ["value", "conf", "disabled", "bindevents"],

  data() {
    return {
      _editor: null,
      editorContent: "",
    };
  },

  computed: {
    editor: {
      cache: false,
      get() {
        return this._editor;
      },
    },
  },

  mounted() {
    injectScript().then(this.initEditor);
  },

  methods: {
    initEditor() {
      this.$refs.editorNode.innerHTML = this.value;
      initMapoMedia(this.insertImgCallback);
      window.tinymce.init(
        Object.assign(fullFeatured, this.conf || {}, {
          target: this.$refs.editorNode,
          readonly: this.disabled,
          setup: this.setupEditor,
        })
      );
    },
    setupEditor(editor) {
      this._editor = editor;
      editor.on("init", () => {
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
          .then((success) =>
            success
              ? resolve(`<img width="50%" src="${success.file}">`)
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
</style>