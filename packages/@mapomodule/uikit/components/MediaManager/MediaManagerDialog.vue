<template>
  <div>
    <slot v-bind="{ on, $attrs }" name="activator"></slot>
    <v-dialog v-model="dialog" max-width="100%" width="800" scrollable>
      <media-manager
        v-if="dialog"
        v-bind="{ noFolders }"
        elevation="0"
        fill-backgroud
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn v-if="select == 'multi'" color="primary" text tile @click="done">{{ $t("mapo.confirm") }}</v-btn>
        </template>
      </media-manager>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "MediaManagerDialog",
  data() {
    return {
      dialog: false,
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
    selected: {
      type: Object | Array | null,
    },
    mime: {
      type: String,
      required: false
    },
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    selected(val){
      this.dialog && this.setSelection(val);
    },
    selection(val){
      if (this.dialog && !(val?.id == this.selected?.id)){
        this.done()
      }
    },
    dialog(val) {
      if(val){
        this.setSelectionMode(this.select).then(() => this.setSelection(this.selected));
      }
      this.$emit("input", val);
      this.$emit(val ? "open" : "close");
      if (!val && this.reject) {
        this.reject();
      }
    },
  },
  computed:{
    ...mapGetters("mapo/media", ["selection", "selectMode"])
  },
  methods: {
    ...mapActions("mapo/media", ["setSelection", "setSelectionMode"]),
    open() {
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    done() {
      if (this.resolve) {
        this.resolve(this.selection);
      }
      this.dialog = false;
      this.$emit("update:selected", this.selection);
    },
  },
};
</script>
