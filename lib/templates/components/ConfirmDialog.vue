<template>
  <div>
    <slot v-bind="{ on, attrs }" name="activator"></slot>
    <v-dialog v-model="dialog" width="350">
      <v-card v-bind="$attrs">
        <v-card-title class="headline">{{question}}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close">Cancel</v-btn>
          <v-btn text @click="accept">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      response: null,
      dialog: false,
      attrs: { ...this.$attrs },
      on: {
        click: (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.dialog = !this.dialog;
        },
      },
    };
  },
  props: {
    value: {
      type: Boolean,
    },
    question: {
      type: String,
      default: "Are you sure of what you are doing?",
    },
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
    },
  },
  methods: {
    open() {
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
    },
  },
};
</script>
