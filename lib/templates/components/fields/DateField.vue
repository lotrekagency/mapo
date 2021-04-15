<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="model"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="model"
          prepend-inner-icon="mdi-calendar"
          readonly
          v-bind="{ ...$attrs, ...attrs }"
          v-on="on"
          clearable
        ></v-text-field>
      </template>
      <v-date-picker v-model="model" :range="range" no-title>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(model)"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "DateField",
  data() {
    return {
      model: null,
      menu: null,
    };
  },
  props: {
    value: String | Array,
    range: Boolean,
  },
  watch: {
    value(val) {
      if (this.model !== val) this.model = val;
    },
    model(val) {
      this.$emit("input", val);
    },
  },
  mounted() {
    this.model = this.value;
  },
};
</script>