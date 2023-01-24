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
import dateFormat from "dateformat";

/**
 * This component is used to edit a time in iso format. It is a combination of "v-text-field" and "v-time-picker".
 * Can get time from a full ISO date (as string) or from string in a HH:MM:ss format.
 */
export default {
  name: "TimeField",
  data() {
    return {
      model: null,
      menu: null,
      returnDate: false,
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
      if (this.model !== val) {
        this.setupValue();
      }
    },
    model(val) {
      // Fired when the v-model changes
      //@arg Emits the time edited.
      if (this.returnDate) this.$emit("input", `${this.value.split("T")[0]}T${val}Z`);
      else this.$emit("input", val);
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
        return this.model && dateFormat(`2000-01-01T${this.model}Z`, "HH:MM:ss");
      },
      set(value) {
        this.model = dateFormat(`2000-01-01T${value}`, "UTC:HH:MM:ss");
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
    setupValue() {
      const d = new Date(this.value);
      this.returnDate = !isNaN(d);
      this.model = !isNaN(d) ? dateFormat(d, "UTC:HH:MM:ss") : this.value;
    },
  },
  mounted() {
    this.setupValue();
  },
};
</script>
