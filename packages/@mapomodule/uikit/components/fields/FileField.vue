<template>
  <div class="filefield-wrapper">
    <v-file-input
      v-bind="$attrs"
      :messages="messages"
      :value="model"
      @change="modelSet"
    >
      <template v-slot:message="{ message }">
        <span
          v-if="message == fileUrl"
          v-show="message"
          class="filefield-current"
          ><b class="mr-1">Current:</b>
          <a :href="message" target="__blank">{{ message }}</a>
          <v-spacer></v-spacer>
          <v-icon @click="clear" class="mb-1" small>mdi-close</v-icon>
        </span>
        <span v-else>
          {{ message }}
        </span>
      </template>
    </v-file-input>
  </div>
</template>

<style lang="scss" scoped>
.filefield-current {
  max-width: 100%;
  white-space: nowrap;
  display: flex;
  a {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>


<script>
/**
 * This component is made to simplify Many To Many associations. With this component you can modify an array selecting items from a list of checkboxes.
 */

export default {
  name: "FileField",
  data() {
    return {
      file: null,
      fileUrl: null,
    };
  },
  props: {
    // V-model property. It is the file.
    value: {
      type: Object | Array | null,
      required: true,
    },
  },
  computed: {
    isString() {
      return typeof this.model == "string";
    },
    model: {
      get() {
        return this.file;
      },
      set(val) {
        if (!val || typeof val == "string") this.fileUrl = val;
        if (!val || val instanceof File) this.file = val;
      },
    },
    messages() {
      const messages =
        typeof this.$attrs.messages == "string"
          ? [this.$attrs.messages]
          : this.$attrs.messages || [];
      this.fileUrl &&
        !messages.includes(this.fileUrl) &&
        messages.push(this.fileUrl);
      return messages;
    },
  },
  watch: {
    value(val) {
      this.model = val;
    },
    model(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    clear() {
      this.model = null;
      this.fileUrl = null;
    },
    modelSet(val) {
      if (!val) {
        this.$emit("input", this.fileUrl);
      } else {
        this.model = val;
      }
    },
  },
};
</script>