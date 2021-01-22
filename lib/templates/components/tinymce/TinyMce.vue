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
      editor.on("ExecCommand", () => this.emitContent(editor));
      editor.on("ObjectResized", () => this.emitContent(editor));
    },
    emitContent(editor) {
      this.editorContent = editor.getContent();
      this.$emit("input", this.editorContent);
    },
    insertImgCallback: async function () {

      // =====THIS IS THE HOOK TO INSERT THE MEDIA MANAGER LOGIC======= //

      // this function is called when the user clicks the bossa media button.
      // this function is async and returns a promise that resolves in an <img> html tag or rejects.
      // when the promise resolves the result is pushed at cursor position inside tinymce
      // when the promise rejects nothing happens :)

      return new Promise((resolve, reject) => {
        var src = prompt(
          "Please insert an image src.",
          "https://i.kym-cdn.com/profiles/icons/big/000/279/747/2e4.jpg"
        );
        return src ? resolve(`<img src="${src}">`) : reject("No image selected");
      });
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