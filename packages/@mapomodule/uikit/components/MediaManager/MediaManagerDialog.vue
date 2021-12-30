<template>
  <div>
    <slot v-bind="{ on, attrs }" name="activator"></slot>
    <v-dialog v-model="dialog" width="800" scrollable>
      <media-manager
        @selectionChange="selectionChange($event)"
        v-bind="{ select, noFolders }"
        elevation="0"
        ref="mediaManager"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn v-if="select == 'multi'" color="primary" text @click="done">done</v-btn>
        </template>
      </media-manager>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "MediaManagerDialog",
  data() {
    return {
      selection: [],
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
    noFolders: {
      type: Boolean,
      default: false,
    },
    select: {
      type: String,
      default: "single",
      validator(val) {
        return ["none", "single", "multi"].indexOf(val) !== -1;
      },
    },
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
      this.$emit(val ? "open" : "close");
      if (!val && this.reject) {
        this.reject();
      }
      if (!val) this.$refs.mediaManager.reset();
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
    selectionChange(event) {
      this.selection = event;
      if (this.select == "single") {
        this.done();
      }
    },
    done() {
      if (this.resolve) {
        this.resolve(this.selection);
      }
      this.dialog = false;
      this.$emit("selectionChange", this.selection);
    },
  },
};
</script>
