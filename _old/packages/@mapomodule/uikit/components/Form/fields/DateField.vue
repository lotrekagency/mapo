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
          v-on="readonly ? undefined : on"
          :clearable="!readonly"
          class="rounded-inherit"
        ></v-text-field>
      </template>
      <v-date-picker v-model="model" :range="range" no-title>
        <v-btn text color="primary" @click="menu = false">{{ $t("mapo.cancel") }}</v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(model)">{{ $t("mapo.ok") }}</v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<style scoped>
.rounded-inherit{
  border-radius: inherit;
}
</style>

<script>
/**
 * This component is used to edit a date in iso format. It is a combination of "v-text-field" and "v-date-picker".
 */
export default {
  name: "DateField",
  data() {
    return {
      model: this.value,
      menu: null,
    };
  },
  props: {
    // V-model property. Is the date to be modified. It can be also array in case of date range.
    value: {
      // `String|Array`
      type: String | Array,
    },
    // Determines if we need to work with date ranges.
    range: {
      type: Boolean,
      default: false
    },
    // This set the component status to readonly, stopping the user interaction.
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(val) {
      if (this.model !== val) this.model = val;
    },
    model(val) {
      // Fired when the v-model changes
      //@arg Emits the date or the date range edited.
      this.$emit("input", val);
    },
  }
};
</script>
