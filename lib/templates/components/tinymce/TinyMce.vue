<template>
  <textarea ref="editorNode" :id="id"></textarea>
</template>

<script>
import initBossaMedia from "~bossamodule/components/tinymce/utils/bossamedia.plugin.js";
import uuid from "~bossamodule/components/tinymce/utils/uuid.js";
import injectScript from "~bossamodule/components/tinymce/utils/script.injector.js";
import { toolbarconfig } from "~bossamodule/components/tinymce/defaults.js";

export default {
  props: ["value"],

  data() {
    return {
      id: uuid("tiny_mce"),
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
      initBossaMedia(() => this.insertImgCallback());
      window.tinymce.init({
        selector: `#${this.id}`,
        plugins: "bossamedia",
        toolbar: toolbarconfig,
        init_instance_callback: this.initCallback,
      });
    },
    initCallback(editor) {
      this._editor = editor;
      this.emitContent(editor);
      editor.on("keyup", () => this.emitContent(editor));
      editor.on("SetContent", () => this.emitContent(editor));
    },
    emitContent(editor) {
      this.editorContent = editor.getContent();
      this.$emit("input", this.editorContent);
    },
    insertImgCallback() {
      var src = prompt(
        "Please insert image src",
        "https://i.kym-cdn.com/profiles/icons/big/000/279/747/2e4.jpg"
      );
      return src ? `<img src="${src}">` : "";
    },
  },

  watch: {
    value(val) {
      if (this.editor && val !== this.editorContent) {
        this.editor.setContent(val);
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