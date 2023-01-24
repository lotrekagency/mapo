<template>
  <div>
    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" max-width="580">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="textFieldString"
          prepend-inner-icon="mdi-calendar"
          readonly
          v-bind="{ ...$attrs, ...attrs }"
          v-on="readonly ? undefined : on"
          :clearable="!readonly"
          class="rounded-inherit"
        ></v-text-field>
      </template>
      <v-card>
        <div class="d-flex flex-nowrap">
          <v-date-picker
            v-model="dateModel"
            :range="range"
            no-title
            v-bind="datePickerAttrs"
            class="rounded-0"
            ref="datePicker"
          >
          </v-date-picker
          ><v-time-picker
            v-model="timeModel"
            no-title
            v-bind="timePickerAttrs"
            ref="timePicker"
            class="rounded-0"
          >
          </v-time-picker>
        </div>
        <v-card-actions class="justify-center">
          <input
            v-model="startRawDateTime"
            type="datetime-local"
            class="primary--text text-h6 raw-input"
            ref="startRawInput"
            autofocus
            @click="disableCalendar"
            @keydown="disableCalendar"
          />
          <v-divider class="mx-4" v-if="range"></v-divider>
          <input
            v-if="range"
            :disabled="!startDateTime"
            v-model="endRawDateTime"
            type="datetime-local"
            class="primary--text text-h6 raw-input"
            ref="endRawInput"
            autofocus
            @click="disableCalendar"
            @keydown="disableCalendar"
          />
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>
.rounded-inherit {
  border-radius: inherit;
}
.raw-input {
  outline: none;
}
</style>

<script>
import dateFormat from "dateformat";
/**
 * This component is used to edit a datetime in iso format. It is a combination of "v-text-field", "v-date-picker" and "v-time-picker".
 */
export default {
  name: "DateTimeField",
  data() {
    return {
      startDateTime: null,
      endDateTime: null,
      menu: null,
      isStartFocused: true,
      focusinFunc: () => {
        this.isStartFocused = document.activeElement !== this.$refs.endRawInput;
      },
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
      default: false,
    },
    // This set the component status to readonly, stopping the user interaction.
    readonly: {
      type: Boolean,
      default: false,
    },
    datePickerAttrs: {
      type: Object,
      default: () => {},
    },
    timePickerAttrs: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    value(val) {
      this.setupValue();
    },
    model(val) {
      // Fired when the v-model changes
      //@arg Emits the date or the date range edited.
      this.$emit("input", val);
    },
    menu(val) {
      if (val)
        setTimeout(() => {
          this.$refs.startRawInput?.focus();
          this.$refs.timePicker.selecting = 1;
        });
    },
    isStartFocused(val, old) {
      if (val != old) this.$refs.timePicker.selecting = 1;
    },
  },
  methods: {
    disableCalendar(evt) {
      if (!evt.keyCode || evt.keyCode == 13) {
        evt.preventDefault();
        return false;
      }
    },
    selectTimePickerMethod(oldDateTime, newDateTime) {
      const currentValue = oldDateTime?.split("T").splice(-1)[0]?.split(":") || [];
      const nextValue = newDateTime?.split("T").splice(-1)[0].split(":") || [];
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
    },
    emit() {
      if (this.range) {
        const start = this.startDateTime && new Date(this.startDateTime);
        const end = this.endDateTime && new Date(this.endDateTime);
        if (start && end && start > end)
          [this.startDateTime, this.endDateTime] = [this.endDateTime, this.startDateTime];
      }
      this.$emit(
        "input",
        this.range
          ? [this.startDateTime, this.endDateTime].filter((d) => d)
          : this.startDateTime
      );
    },
    setupValue() {
      const dates =
        (typeof this.value == "string" && this.value
          ? this.value.split(",").filter((v) => v)
          : this.value) || [];
      this.startDateTime = dates.length > 0 ? dates[0] : null;
      this.endDateTime = dates.length > 1 ? dates[1] : null;
    },
  },
  computed: {
    timeModel: {
      get() {
        const time = this.isStartFocused ? this.startDateTime : this.endDateTime;
        if (!time) return null;
        return dateFormat(time, "HH:MM:ss");
      },
      set(value) {
        const mergeTime = (dateTime, time) => {
          let newDateTime = new Date(dateTime);
          const [hours, minutes, seconds] = time.split(":").map((n) => parseInt(n));
          if (hours) newDateTime.setHours(hours);
          if (minutes) newDateTime.setMinutes(minutes);
          if (seconds) newDateTime.setSeconds(seconds);
          return newDateTime.toISOString();
        };

        if (this.isStartFocused)
          this.startDateTime = mergeTime(this.startDateTime, value);
        else this.endDateTime = mergeTime(this.endDateTime, value);
        this.emit();
      },
    },
    dateModel: {
      get() {
        const d = [this.startDateTime, this.endDateTime]
          .filter((d) => d)
          .map((d) => dateFormat(d, "yyyy-mm-dd"));
        if (this.range) return d;
        else if (d.length > 0) return d[0];
        return null;
      },
      set(value) {
        const mergeDate = (dateTime, date) => {
          let newDateTime = new Date(dateTime);
          const dateObj = new Date(date);
          newDateTime.setFullYear(dateObj.getFullYear());
          newDateTime.setMonth(dateObj.getMonth());
          newDateTime.setDate(dateObj.getDate());
          return newDateTime.toISOString();
        };

        if (this.range && value.length == 2) {
          this.endDateTime = mergeDate(this.endDateTime || null, value[1]);
          this.startDateTime = mergeDate(this.startDateTime || null, value[0]);
          setTimeout(() => this.$refs.endRawInput?.focus());
        } else {
          this.endDateTime = null;
          this.startDateTime = mergeDate(
            this.startDateTime || null,
            Array.isArray(value) ? value[0] : value
          );
        }
        this.emit();
      },
    },
    startRawDateTime: {
      get() {
        if (!this.startDateTime) return null;
        return dateFormat(this.startDateTime, "yyyy-mm-dd'T'HH:MM:ss");
      },
      set(value) {
        const oldDateTime = this.startDateTime;
        if (value) this.startDateTime = new Date(value).toISOString();
        this.selectTimePickerMethod(oldDateTime, this.startDateTime);
        this.emit();
      },
    },
    endRawDateTime: {
      get() {
        if (!this.endDateTime) return null;
        return dateFormat(this.endDateTime, "yyyy-mm-dd'T'HH:MM:ss");
      },
      set(value) {
        const oldDateTime = this.endDateTime;
        if (value) this.endDateTime = new Date(value).toISOString();
        this.selectTimePickerMethod(oldDateTime, this.endDateTime);
        setTimeout(() => this.$refs.endRawInput?.focus());
        this.emit();
      },
    },
    textFieldString() {
      return this.range
        ? [this.startDateTime, this.endDateTime]
            .filter((d) => d)
            .map((d) => new Date(d).toLocaleString())
            .join(", ")
        : this.startDateTime && new Date(this.startDateTime).toLocaleString();
    },
  },
  mounted() {
    if (process.client) {
      document.addEventListener("focusin", this.focusinFunc);
    }
    this.setupValue();
  },
  destroyed() {
    if (process.client) {
      document.removeEventListener("focusin", this.focusinFunc);
    }
  },
};
</script>
