<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="model"
          readonly
          v-bind="{ ...$attrs, ...attrs }"
          v-on="readonly ? undefined : on"
          class="rounded-inherit"
        >
          <template v-if="model" v-slot:append>
            <div class="color-picker-inner-icon" :style="`background-color: ${model}`"></div>
          </template>
        </v-text-field>
      </template>
      <v-card>
        <v-color-picker
          v-model="model"
          mode="hexa"
          hide-mode-switch
          v-bind="$attrs"
          v-on="$listeners"
        ></v-color-picker>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>
.color-picker-inner-icon {
  width: 20px;
  height: 20px;
  border-radius: 20px;
}
.rounded-inherit{
  border-radius: inherit;
}
</style>

<script>
/**
 * This component wraps vuetify's color picker as a Mapo field.
 */
export default {
  name: "ColorField",
  data() {
    return {
      model: this.value || "",
      menu: null,
    };
  },
  props: {
    // V-model property. Color must be hex codified.
    value: {
      type: String,
    },
    // This set the component status to readonly, stopping the user interaction.
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(val) {
      this.model = val || "";
    },
    model(val) {
      this.$emit("input", val);
    },
  },
};
</script>
