<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="localModel"
          prepend-inner-icon="mdi-clock"
          v-bind="{ ...$attrs, ...attrs }"
          v-on="readonly ? undefined : on"
          readonly
          :clearable="!readonly"
          class="rounded-inherit"
        ></v-text-field>
      </template>
      <v-time-picker v-model="localModel" no-title v-bind="$attrs" ref="timePicker">
        <div class="raw-input-container">
          <input
            :value="localModel"
            type="time"
            class="primary--text text-h6"
            ref="rawInput"
            @input="setModel"
            autofocus
            v-bind="$attrs"
          />
        </div>
      </v-time-picker>
    </v-menu>
  </div>
</template>

<style scoped>
.rounded-inherit {
  border-radius: inherit;
}
.raw-input-container {
  width: 100%;
}
.raw-input-container input {
  width: 100%;
  text-align: center;
  outline: none;
}
</style>

<script>
import {
  formatLocalTime,
  cleanDateStr,
  formatUTCTime,
  mergeTime,
} from "@mapomodule/utils/helpers/datetime";

/**
 * This component is used to edit a time in iso format. It is a combination of "v-text-field" and "v-time-picker".
 * Can get time from a full ISO date (as string in UTC timezone) or from string in a HH:MM:ss format.
 */
export default {
  name: "TimeField",
  data() {
    return {
      model: { model: null, returnDate: false },
      menu: null,
      isUpdating: false, // Add a flag to track updates
    };
  },
  props: {
    // V-model property. Is the time to be modified.
    value: {
      // `String`
      type: String, // TODO: make it work also with arrays for ranges
    },
    // This set the component status to readonly, stopping the user interaction.
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
      value(val) {
      if (!this.isUpdating) { // Check if an update is already in progress
        const model = this.setupModel(val);
        if (JSON.stringify(model) !== JSON.stringify(this.model)) {
          this.isUpdating = true; // Set the flag to indicate an update is in progress
          this.model = model;
        }
      }
    },
    model: {
      handler: function (val) {
        // Fired when the v-model changes
        //@arg Emits the time edited.
        if (val.returnDate) this.$emit("input", val.model.toISOString());
        else this.$emit("input", formatUTCTime(val.model));
      },
      deep: true,
    },
    menu(val) {
      if (val)
        setTimeout(() => {
          this.$refs.rawInput.focus();
        });
    },
  },
  computed: {
    localModel: {
      get() {
        return this.model?.model && formatLocalTime(this.model?.model);
      },
      set(value) {
        this.model.model = mergeTime(this?.model?.model || new Date(), value);
      },
    },
  },
  methods: {
    setModel(evt) {
      const model = evt.target.value;
      const currentValue = this.localModel?.split(":") || [];
      const nextValue = model?.split(":") || [];
      for (
        let index = 0;
        index < Math.min(currentValue.length, nextValue.length);
        index++
      ) {
        if (currentValue[index] != nextValue[index]) {
          this.$refs.timePicker.selecting = index + 1;
          break;
        }
      }
      this.localModel = model;
    },
    setupModel(val) {
      const d = new Date(cleanDateStr(val));
      const returnDate = !isNaN(d);
      const model = !isNaN(d) ? d : mergeTime(new Date(), cleanDateStr(val));
      return { returnDate, model };
    },
  },
  mounted() {
    this.model = this.setupModel(this.value); // Initialize the model on mount
  },
  updated() {
    this.isUpdating = false; // Reset the flag after the component updates
  },
};
</script>
