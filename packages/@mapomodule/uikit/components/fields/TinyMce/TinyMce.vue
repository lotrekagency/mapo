<template>
  <div>
    <media-manager-dialog ref="mediaManager"></media-manager-dialog>
    <span v-if="label">{{ label }}:</span>
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
 * This component wraps a [TinyMce](https://www.tiny.cloud/) instance. With the use of the v-model you can use this component to edit any content you like. 
 */

export default {
  name: "TinyMce",
  props: {
    // V-model property. Is the content that will populate the TinyMce instance.
    value: {
      type: String,
      default: "",
    },
    // This is the main configuration of TinyMce. If setted will be merged with this component defaults.
    conf: {
      type: Object,
      default: () => ({}),
    },
    // This label will be shown at the top of the editor.
    label: String,
    // This is an array of validation errors that will be displayed under the editor.
    errorMessages: Array,
    // This set the component status to disabled, stopping the user interaction.
    disabled: {
      type: Boolean,
      default: false,
    },
    // Use this prop to bind events. If set to true the component will emit every [TinyMce Event](https://www.tiny.cloud/docs/advanced/events/).
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
      // Fired when the v-model changes
      //@arg Emits the content of the editor
      this.$emit("input", this.editorContent);
    },
    bindEvents(editor) {
      if (this.bindevents) {
        validEvents.forEach((eventName) => {
          // This is a dynamic event emitter. If you activate the bindevents prop, you will be able to listen to every [TinyMce Event](https://www.tiny.cloud/docs/advanced/events/).
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
</style>

<docs>

### Defaults

This is the default [TinyMce configuration](https://www.tiny.cloud/docs/configure/).

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
