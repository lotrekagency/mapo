<template>
  <div>
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
    value: {
      type: Boolean
    },
    question: {
      type: String,
      default: "Are you sure of what you are doing?"
    },
    title: {
      type: String,
      default: "Confirm"
    },
    dismissButton: {
      type: Object,
      default: () => ({ text: "Cancel", attrs: { text: true } })
    },
    approveButton: {
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
      this.$emit("input", val);
      this.$emit(val ? "open" : "close");
      if (!val && this.resolve) {
        this.resolve(null);
      }
    }
  },
  methods: {
    open(options) {
      this.optionsBk = { ...this.options };
      this.options = { ...this.options, ...options };
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    accept() {
      this.response = true;
      this.close();
    },
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
