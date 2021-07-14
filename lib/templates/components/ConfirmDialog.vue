<template>
  <div>
    <!-- Activator slot, this follows the logics of <a href="https://vuetifyjs.com/en/api/v-dialog/#api-slots" target="__blank">vuetify activator</a>.-->
    <slot v-bind="{ on, attrs: options.attrs }" name="activator"></slot>
    <v-dialog v-model="dialog" v-bind="{ width: 350, ...options.attrs }">
      <v-card v-bind="options.attrs">
        <v-card-title>{{ options.title }}</v-card-title>
        <v-card-text class="headline">{{ options.question }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-bind="dismissAttrs" @click="close">{{ dismissTxt }}</v-btn>
          <v-btn @click="accept" v-bind="approveAttrs">{{ approveTxt }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

/**
 * This component is embedded in the default layout. 
 * It's a dynamic dialog which is used to ask the user for confirmation before performing an operation.<br>
 * For example: `Do you really want to delete the content 'abcd'?` <br><br>
 * It can be globally accessed with [this.$mapo.$confirm](/core/#confirm)
 * 
 */ 
export default {
  name: "ConfirmDialog",
  data() {
    return {
      response: null,
      dialog: false,
      optionsBk: null,
      options: {
        title: this.title,
        question: this.question,
        dismissButton: this.dismissButton,
        approveButton: this.approveButton,
        attrs: { ...this.$attrs }
      },
      on: {
        click: event => {
          event.preventDefault();
          event.stopPropagation();
          this.dialog = !this.dialog;
        }
      }
    };
  },
  props: {
    // v-model boolean that controll the status of the dialog (opened/closed)
    value: {
      type: Boolean,
      default: false
    },
    // The text in the body of the dialog.
    question: {
      type: String,
      default: "Are you sure of what you are doing?"
    },
    // The title of the dialog.
    title: {
      type: String,
      default: "Confirm"
    },
    // The text plus props passed to the dismiss Button.
    dismissButton: {
      // `{ text: String, attrs: Object }`
      type: Object,
      default: () => ({ text: "Cancel", attrs: { text: true } })
    },
    // The text plus props passed to the approve Button.
    approveButton: {
      // `{ text: String, attrs: Object }`
      type: Object,
      default: () => ({ text: "Ok", attrs: { color: "primary", text: true } })
    }
  },
  computed: {
    approveTxt() {
      return this.options.approveButton?.text || "Ok";
    },
    approveAttrs() {
      return this.options.approveButton?.attrs || {};
    },
    dismissTxt() {
      return this.options.dismissButton?.text || "Cancel";
    },
    dismissAttrs() {
      return this.options.dismissButton?.attrs || {};
    }
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      // Fired when the v-model changes.
      // @arg Emits `true|false` based on the dialog status `open|close`.
      this.$emit("input", val);
      if (val) {
        // Fired when the dialog opens
        this.$emit("open")
      } else {
        // Fired when the dialog closes
        this.$emit("close")
      }
      if (!val && this.resolve) {
        this.resolve(null);
      }
    }
  },
  methods: {
   /**
    * @vuese
    * This open the Confirm dialog component showing to the user a question. Returns a promise with the user response.
    * See [this.$mapo.$confirm.open](/core/#confirm)
    * @arg The payload containing the information to show to the user in the confirm dialog.
    */
    open(options) {
      this.optionsBk = { ...this.options };
      this.options = { ...this.options, ...options };
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    /**
     * @vuese
     * This forces the dialog to close, giving a positive response.
     * See [this.$mapo.$confirm.close](/core/#confirm)
     */
    accept() {
      this.response = true;
      this.close();
    },
    /**
     * @vuese
     * This forces the dialog to close, giving a positive response.
     * See [this.$mapo.$confirm.accept](/core/#confirm)
     */
    close() {
      if (this.resolve) {
        this.resolve(this.response);
      }
      this.dialog = false;
      this.options = { ...this.optionsBk };
    }
  }
};
</script>
