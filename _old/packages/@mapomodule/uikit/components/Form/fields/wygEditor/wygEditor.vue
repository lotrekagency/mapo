<template>
  <div class="mapo-wyg-editor">
    <media-manager-dialog ref="mediaManager"></media-manager-dialog>
    <span v-if="label" class="v-label" :class="{'error--text': hasErrors, 'text--secondary': !hasErrors}">{{ label }}:</span>
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

<style lang="scss">
.tox-notifications-container,
.tox-statusbar__branding {
  display: none;
}
.v-label.error--text{
  animation: v-shake 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.tox-tinymce-aux {
    z-index: 200 !important;
}
.mapo-field--has-errors{
  .tox.tox-tinymce{
    border: solid var(--v-error-base) 2px;
  }
}
</style>

<script>
import initMapoMedia from "./utils/mapomedia.plugin.js";
import injectScript from "./utils/tinymce.injector.js";
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
      editorContent: this.value,
    };
  },

  computed: {
    hasErrors () { return this.errorMessages && this.errorMessages.length },
    editor: {
      cache: false,
      get() {
        return this.editorInstance;
      },
    },
    defaultConfiguration(){
      const { base } = this.$router.options;
      const { isDark } = this.$vuetify.theme;
      return defaults({ base, isDark })
    }
  },

  mounted() {
    injectScript().then(this.initEditor);
  },

  methods: {
    initEditor() {
      initMapoMedia(this.insertMediaCallback);
      window.tinymce.init(
        Object.assign(this.defaultConfiguration, this.conf, {
          target: this.$refs.editorNode,
          readonly: this.readonly,
          setup: (ctx) => this.setupEditor(ctx),
        })
      );
      window.document.addEventListener('click', this.closeModal);
    },
    setupEditor(editor) {
      this.editorInstance = editor;
      editor.on("init", () => {
        if (this.value){
          editor.setContent(this.value);
          this.emitContent(editor);
        } else {
          editor.setContent("");
        }
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
    closeModal(event){
      if (event.target.classList.contains("tox-dialog-wrap__backdrop"))
        this.editor.windowManager.close();
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
    destroyEditor(){
      window?.document?.removeEventListener('click', this.closeModal);
      window?.tinymce?.remove(this.editor);
    },
    reloadEditor(){
      this.destroyEditor();
      this.initEditor();
    }
  },
  beforeDestroy() {
    this.destroyEditor();
  },
  watch: {
    value(val) {
      if (this.editor && this.editor.initialized && val !== this.editorContent) {
        this.editorContent = val
        this.editor.setContent(val || "");
      }
    },
    readonly(val) {
      if (this.editor && this.editor.initialized) {
        this.editor.setMode(val ? "readonly" : "design");
      }
    },
    '$vuetify.theme.isDark'(){ this.reloadEditor(); }
  },
};
</script>

<docs>

### Defaults

This is the default [wygEditor configuration](https://www.tiny.cloud/docs/configure/).

```js
{
  plugins: 'mapomedia preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
  menubar: 'file edit view insert format tools table help',
  menu: { insert: { title: 'Insert', items: 'link mapomedia media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor | insertdatetime' } },
  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | mapomedia media template link anchor codesample | ltr rtl',
  toolbar_sticky: true,
  image_advtab: true,
  importcss_append: true,
  template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
  height: 400,
  image_caption: true,
  quickbars_insert_toolbar: 'mapomedia quicktable',
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote mapomedia quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link mapomedia table',
  skin: useDarkMode ? 'oxide-dark' : 'oxide',
  content_css: useDarkMode ? 'dark' : 'default',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}
```
<br><br>

## Live Demo

<br>

::: warning LIVE DEMO 🎉🎉🎉
This is an interactive example. You can play with it but remember that all http features are disabled since there is no backend server.
:::

::: demo
<template>
  <v-app>
    <wygEditor v-model="tinyInput" :readonly="readonly" />
    <v-btn dark class="mb-2" @click.native="readonly = !readonly">
      {{ readonly ? "Enable" : "Disable" }} editor
    </v-btn>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      readonly: false,
      tinyInput: `
        <p style="text-align: center;"><span style="color: #bdc3c7;">&rarr; This is a full-featured editor demo. Please explore!
        &larr;</span></p>
        <p style="text-align: center;">&nbsp;</p>
        <h2 style="text-align: center;">TinyMCE is the world's most customizable, and flexible, rich text editor.</h2>
        <p style="text-align: center;"><strong> <span style="font-size: 14pt;"> <span style="color: #7e8c8d; font-weight: 600;">
                        A featherweight download, TinyMCE can handle any challenge you throw at it. </span> </span> </strong>
        </p>
        <p style="text-align: center;">&nbsp;</p>
        <table style="border-collapse: collapse; width: 85%; margin-left: auto; margin-right: auto; border: 0;">
            <tbody>
                <tr>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">🛠 50+
                            Plugins</span></td>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">💡 Premium
                            Support</span></td>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">🖍 Custom
                            Skins</span></td>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">⚙ Full API
                            Access</span></td>
                </tr>
            </tbody>
        </table>
      `,
    };
  },
};
</script>
:::

</docs>
