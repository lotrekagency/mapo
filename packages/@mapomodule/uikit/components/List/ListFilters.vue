<template>
  <div v-if="compFilters.length">
    <v-menu offset-y nudge-right="380px" max-width="400px" tile :close-on-content-click="false" v-bind="{ ...$attrs, value: null }" >
      <template v-slot:activator="{ on }">
        <v-row class="flex-sm-row-reverse">
          <v-col cols="12" sm="3" class="d-flex justify-end align-center">
            <v-btn v-bind="$attrs" v-on="on" text>
              filter <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </v-col>
          <v-col v-if="activeFilters.length" cols="12" sm="9">
            <v-slide-group v-bind="$attrs" show-arrows>
              <v-chip
                v-bind="$attrs"
                class="ma-1"
                close
                label
                @click:close="removeFilter(filter)"
                v-for="(filter, i) in activeFilters"
                :key="i"
              >
                <span>
                  <small>
                    <b>{{ filter.text.toUpperCase() }}: </b>
                    {{ formatActiveChoices(filter.active).toUpperCase() }}
                  </small>
                </span>
              </v-chip>
            </v-slide-group>
          </v-col>
        </v-row>
      </template>

      <v-list class="pa-0">
        <div v-for="(filter, index) in compFilters" :key="index">
          <!-- This is a dynamic slot. You can use it to override filters. <br> For example use `filter.status` to completely override the rendering of the filter with `"status"` as value. -->
          <slot
            :name="`filter.${filter.value}`"
            v-bind="{
              filter,
              addFilter,
              removeFilterChoice,
              toggleChoice,
              activeFilters,
            }"
          >
            <v-list-group>
              <v-list-item-title slot="activator">
                <!-- This is a dynamic slot. You can use it to override filters title. -->
                <slot
                  :name="`filter.${filter.value}.title`"
                  v-bind="{
                    filter,
                    addFilter,
                    removeFilterChoice,
                    toggleChoice,
                    activeFilters,
                  }"
                >
                  {{ filter.text }}
                </slot>
              </v-list-item-title>
              <!-- This is a dynamic slot. You can use it to override filters content.-->
              <slot
                :name="`filter.${filter.value}.content`"
                v-bind="{
                  filter,
                  addFilter,
                  removeFilterChoice,
                  toggleChoice,
                  activeFilters,
                }"
              >
                <div v-if="filter.datepicker" class="d-flex flex-column align-end justify-center pb-2">
                  <v-date-picker
                    @input="addDateFilter(filter)"
                    class="rounded-0"
                    v-model="filter.dates"
                    range
                    full-width
                    no-title
                    color="primary"
                  >
                  </v-date-picker>
                  <v-btn
                    class="datapicker-clear-btn elevation-0"
                    @click="removeFilter(filter)"
                    small
                    tile
                    >clear</v-btn
                  >
                </div>
                <v-list v-else class="overflow-y-auto pa-0" max-height="200" dense>
                  <v-list-item
                    v-for="(choice, i) in filter.choices"
                    :key="i"
                    class="v-list-item--link"
                    active-class="primary--text"
                    :input-value="isChoiceActive(filter, choice)"
                    @click.native.stop="toggleChoice(filter, choice)"
                  >
                    <!-- This is a dynamic slot. You can use it to override filters icon. -->
                    <slot
                      :name="`filter.${filter.value}.icon`"
                      v-bind="{ filter, choice }"
                    >
                      <v-list-item-icon>
                        <v-icon
                          v-text="choice.icon || 'mdi-circle-small'"
                        ></v-icon>
                      </v-list-item-icon>
                    </slot>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="choice.text"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </slot>
            </v-list-group>
          </slot>
        </div>
      </v-list>
    </v-menu>
  </div>
</template>

<style lang="scss" scoped>
.datapicker-clear-btn {
  margin: -20px 15px 0 0 ;
}
</style>

<script>
import { debounce } from "@mapomodule/utils/helpers/debounce";
/**
 * This components renders the filter menu in the upper-right. The menu provides a selection of filters applicable to the list.
 * The list of applied filters appears next to the menu as a list of chips containing the name of the filter and the applied values. <br>
 * If no filters are passed to the component it will not be rendered.
 */
export default {
  name: "ListFilters",
  data() {
    return {
      compFilters: [],
      activeFilters: [],
    };
  },
  props: {
    // This is the main configuration of the component. It contains a list of filters.
    filters: {
      // [`Array<Filter>`](#filter-config)
      type: Array,
      default: () => [],
    },
  },
  methods: {
    addDateFilter(filter) {
      const { dates } = filter;
      if (dates && dates.length > 1) {
        this.addFilter(filter, {
          text: dates.join(" ~ "),
          value: dates.join(","),
        });
      } else if (!dates || !dates.length) {
        this.removeFilter(filter);
      }
    },
    removeFilter(filter) {
      if (filter.datepicker) {
        const idx = this.compFilters.findIndex((f) => f.value === filter.value);
        if (this.compFilters[idx].dates) this.compFilters[idx].dates = [];
      }
      const i = this.activeFilters.findIndex((f) => f.value === filter.value);
      this.activeFilters.splice(i, 1);
    },
    toggleChoice(filter, choice) {
      if (this.isChoiceActive(filter, choice)) {
        this.removeFilterChoice(filter, choice);
      } else {
        this.addFilter(filter, choice);
      }
    },
    removeFilterChoice(filter, choice) {
      const index = this.activeFilters.findIndex(
        (f) => f.value === filter.value
      );
      if (index !== -1) {
        const chI = this.activeFilters[index].active.findIndex(
          (c) => c.value === choice.value
        );
        if (chI !== -1) {
          this.activeFilters[index].active.splice(chI, 1);
        }
        this.activeFilters[index].active.length ||
          this.activeFilters.splice(index, 1);
      }
    },
    addFilter(filter, choice) {
      const index = this.activeFilters.findIndex(
        (f) => f.value === filter.value
      );
      if (index !== -1) {
        const chI = this.activeFilters[index].active.findIndex(
          (c) => c.value === choice.value
        );
        if (chI !== -1) {
          return;
        } else if (filter.multiple && !filter.datepicker) {
          this.activeFilters[index].active.push(choice);
        } else {
          this.activeFilters[index].active = [choice];
        }
      } else {
        this.activeFilters.push({ ...filter, active: [choice] });
      }
    },
    isChoiceActive(filter, choice) {
      const found = this.activeFilters.find((f) => f.value == filter.value);
      return (
        (found?.active || []).findIndex((c) => c.value == choice.value) !== -1
      );
    },
    formatActiveChoices(choices) {
      return choices.map((c) => c.text).join(", ");
    },
    setQparams(filters) {
      const ourQ = filters.reduce(
        (acc, filter) => ({
          ...acc,
          [filter.value]: filter.active.map((c) => c.value).join(","),
        }),
        {}
      );
      const otherQ = Object.keys(this.$route.query)
        .filter((k) => !this.compFilters.some((f) => f.value == k))
        .reduce((acc, k) => ({ ...acc, [k]: this.$route.query[k] }), {});
      this.$router.push({ query: { ...otherQ, ...ourQ } });
    },
    restoreFromQparams() {
      Object.keys(this.$route.query).forEach((k) => {
        const index = this.compFilters.findIndex((f) => f.value == k);
        if (index !== -1) {
          let filter = this.compFilters[index];
          if (filter.datepicker) {
            filter = { ...filter };
            filter.dates = [...this.$route.query[k].split(",")];
            this.addDateFilter(filter);
          } else {
            filter.choices.forEach((c) => {
              this.$route.query[k].split(",").includes(c.value + "") &&
                this.addFilter(filter, c);
            });
          }
        }
      });
    },
  },
  watch: {
    activeFilters: {
      deep: true,
      handler: debounce(function (val) {
        // This is an internal event to bind the active filters with other List parts.
        this.$emit("input", val);
        this.setQparams(val);
      }, 200),
    },
  },
  mounted() {
    this.compFilters = this.filters;
    this.restoreFromQparams();
  },
};
</script>

<docs>
## Filter config

The filters prop is a list of `Filter` objects made of several keys: 

- **"text"** `String` ==> The name of the filter that will be renered inside the filter menu.
- **"value"** `String` ==> The dotted path of the value we need to filter on.
- **"choices"** `Array<Choice>` ==> The list of choices rendered inside the filter. The text is the label, the value is the string we use as a filter.
- **"datepicker"** `Boolean` ==> This is a boolean that determines if the filter has a datepicker layout.
- **"multiple"** `Boolean` ==> This is a boolean that determines if the filter is exclusive or inclusive. In other words, if by selecting a choice it is added to the previous one or if it replaces it.

### Choice object

The choice object is used to list all the available choices of a single filter.
It is made of:

- **"text"** `String` ==> The label of the choice.
- **"value"** `String` ==> The value that will be used to filter the list if this choice is active.
- **"icon"** `String` ==> The icon at the left of the choice label, by default we use 'mdi-circle-small'. For a list of all available icons, visit the official [Material Design Icons](https://materialdesignicons.com/) page.


## Example
Here an example of two filters for an article list; one based on article status and the other on the publication date:

```js
const filters = [
  {
    text: "Status",
    value: "status",
    choices: [
      { text: "Draft", value: "DRF" },
      { text: "Published", value: "PUB" },
      { text: "Trash", value: "TRS" },
    ],
  },
  {
    text: "Date",
    value: "date",
    datepicker: true
  },
]
```
</docs>