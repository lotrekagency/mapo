<template>
  <div>
    <media-manager-dialog ref="mediaManager"></media-manager-dialog>
    <span v-if="label" class="v-label" :class="{'error--text': errorMessages && errorMessages.length}">{{ label }}:</span>
    <div ref="editorNode">
      <v-skeleton-loader
        type="table-heading, list-item-two-line, list-item-avatar-two-line, list-item-three-lineimage, table-tfoot"
      ></v-skeleton-loader>
    </div>
    <div class="mt-2">
      <v-messages :value="errorMessages" color="error"></v-messages>
    </div>
  </div>
</template>

<script>
import initMapoMedia from "./utils/mapomedia.plugin.js";
import injectScript from "./utils/script.injector.js";
import defaults from "./defaults.js";
import validEvents from "./utils/events.js";

/**
 * This component wraps a [wygEditor](https://www.tiny.cloud/) instance. With the use of the v-model you can use this component to edit any content you like. 
 */

export default {
  name: "wygEditor",
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
    // Use this prop to bind events. If set to true the component will emit every [wygEditor Event](https://www.tiny.cloud/docs/advanced/events/).
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
      initMapoMedia(this.insertMediaCallback);
      window.tinymce.init(
        Object.assign(defaults, this.conf, {
          target: this.$refs.editorNode,
          readonly: this.readonly,
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
      // Fired when the v-model changes
      //@arg Emits the content of the editor
      this.$emit("input", this.editorContent);
    },
    bindEvents(editor) {
      if (this.bindevents) {
        validEvents.forEach((eventName) => {
          // This is a dynamic event emitter. If you activate the bindevents prop, you will be able to listen to every [wygEditor Event](https://www.tiny.cloud/docs/advanced/events/).
          editor.on(eventName, (event) => this.$emit(eventName, event));
        });
      }
    },
    insertMediaCallback: async function () {
      return new Promise((resolve, reject) => {
        this.$refs.mediaManager.open()
          .then((result) => {
            if (result) {
              let html;
              switch (result.mime_type && result.mime_type.split("/")[0]) {
                case "image":
                  html = `<img width="300px" src="${result.file}" alt="${result.alt_text}">`;
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
    window && window.tinymce && window.tinymce.remove(this.editor);
  },
  watch: {
    value(val) {
      if (this.editor && this.editor.initialized && val !== this.editorContent) {
        this.editorContent = val
        this.editor.setContent(val);
      }
    },
    readonly(val) {
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
.v-label.error--text{
  animation: v-shake 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>

<docs>

### Defaults

This is the default [wygEditor configuration](https://www.tiny.cloud/docs/configure/).

```js
{
  plugins: 'mapomedia preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  menubar: 'file edit view insert format tools table help',
  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile image mapomedia media template link anchor codesample | ltr rtl',
  toolbar_sticky: true,
  image_advtab: true,
  importcss_append: true,
  template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
  height: 600,
  image_caption: true,
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image imagetools table',
  skin: useDarkMode ? 'oxide-dark' : 'oxide',
  content_css: useDarkMode ? 'dark' : 'default',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}
```
</docs>
