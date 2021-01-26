<template>
  <textarea ref="editorNode"></textarea>
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
    injectScript().then(() => this.initEditor());
  },

  methods: {
    initEditor() {
      this.$refs.editorNode.innerHTML = this.value;
      initMapoMedia(() => this.insertImgCallback());
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
      // =====THIS IS THE HOOK TO INSERT THE MEDIA MANAGER LOGIC======= //

      // this function is called when the user clicks the mapo media button.
      // this function is async and returns a promise that resolves in an <img> html tag or rejects.
      // when the promise resolves the result is pushed at cursor position inside tinymce
      // when the promise rejects nothing happens :)

      return new Promise((resolve, reject) => {
        var src = prompt(
          "Please insert an image src.",
          "https://i.kym-cdn.com/profiles/icons/big/000/279/747/2e4.jpg"
        );
        return src
          ? resolve(`<img src="${src}">`)
          : reject("No image selected");
      });
    },
  },
  beforeDestroy() {
    window && window.tinymce && window.tinymce.remove(this.editor);
  },
  watch: {
    value(val) {
      if (this.editor && val !== this.editorContent) {
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