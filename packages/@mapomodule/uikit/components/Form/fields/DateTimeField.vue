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
          prepend-inner-icon="mdi-clipboard-text-clock"
          readonly
          v-bind="{ ...$attrs, ...attrs }"
          v-on="readonly ? undefined : on"
          :clearable="!readonly"
          class="rounded-inherit"
        ></v-text-field>
      </template>
      <template>
        <v-date-picker v-model="modelDate" :range="range">
          <v-container>
            <v-row justify="center">
              <v-col cols="3">
                <v-select label="Hour" v-model="modelTimeHour" :items="hoursList"></v-select>
              </v-col>
              <v-col cols="3">
                <v-select label="Minute" v-model="modelTimeMin" :items="minutesList"></v-select>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-btn text color="primary" @click="menu = false">{{ $t("mapo.cancel") }}</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(model)">{{ $t("mapo.ok") }}</v-btn>
            </v-row>
          </v-container>
        </v-date-picker>

      </template>
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
      modelDate: this.value,
      modelTimeHour: this.value,
      modelTimeMin: this.value,
      hoursList: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
      minutesList: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
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
      //if (this.model !== val) this.model = val;
      if (this.model !== val) this.model = val;
    },
    model(val) {
      // Fired when the v-model changes
      //@arg Emits the date concatenate with the time string edited.
      this.$emit("input", this.modelDate+' '+this.modelTimeHour+':'+this.modelTimeMin);
    },
    modelDate(val) {
      // Fired when the v-model changes
      //@arg Emits the date or the date range edited.
      this.$emit("input", val);
    },
    modelTimeHour(val) {
      // Fired when the v-model changes
      //@arg Emits the time hours edited.
      this.$emit("input", val);
    },
    modelTimeMin(val) {
      // Fired when the v-model changes
      //@arg Emits the time minutes edited.
      this.$emit("input", val);
    },
  }
};
</script>
