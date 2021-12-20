<template>
  <div>
    <v-data-table
      v-model="selection"
      v-bind="$attrs"
      :items="httpEnabled ? items : filteredItems"
      :loading="loading"
      :options.sync="options"
      :search="searchable && !httpEnabled ? searchValue : ''"
      :server-items-length="httpPaginator.count || -1"
      :class="{ 'mapo__listtable__all_selected': selectAll }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-if="searchable"
            v-model="searchValue"
            @input="loadingSearch = true; changeSearch()"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            outlined
            dense
            clearable
            :loading="loadingSearch"
            style="max-width: 300px"
          ></v-text-field>
          <v-spacer></v-spacer>
          <slot name="dtable.top.center"></slot>
          <v-spacer></v-spacer>
          <v-btn text v-if="shouldEdit" @click="editItem()">
            <v-icon small left class="mr-2"> mdi-plus </v-icon>
            Quick add
          </v-btn>
          <v-btn class="ma-2" @click="getDataFromApi(false)" icon>
            <v-icon>mdi-update</v-icon>
          </v-btn>
        </v-toolbar>
        <slot name="dtable.top.under"></slot>
      </template>
      <template v-if="navigable" v-slot:[`item.${firstColName}`]="{ item }">
        <NuxtLink :to="detailLink(item)">
          {{ item[firstColName] }}
        </NuxtLink>
      </template>
      <template v-slot:item.data-table-select="{ isSelected, select }" v-if="selectAll">
        <v-simple-checkbox v-model="selectAll" @input="select"></v-simple-checkbox>
      </template>
      <template v-slot:header.data-table-select="{ on, props }" v-if="selectAll">
        <v-simple-checkbox v-model="selectAll" @input="on.input"></v-simple-checkbox>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon v-if="shouldEdit" small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-for="slot in filterSlots($slots, 'dtable.')" :slot="slot">
        <slot :name="`dtable.${slot}`"></slot>
      </template>
      <template
        v-for="slot in filterSlots($scopedSlots, 'dtable.')"
        v-slot:[slot]="props"
      >
        <slot :name="`dtable.${slot}`" v-bind="props" />
      </template>
    </v-data-table>
    <list-quick-edit
      v-if="shouldEdit"
      ref="editModal"
      v-bind="{ ...$attrs, value: false, crud }"
    >
      <template v-for="slot in filterSlots($slots, 'qedit.')" :slot="slot">
        <slot :name="`qedit.${slot}`"></slot>
      </template>
      <template v-for="slot in filterSlots($scopedSlots, 'qedit.')" v-slot:[slot]="props">
        <slot :name="`qedit.${slot}`" v-bind="props" />
      </template>
    </list-quick-edit>
  </div>
</template>

<style lang="scss">
.mapo__listtable__all_selected {
  .v-data-table__selected {
    background: none !important;
  }
}
</style>

<script>
import { getPointed } from "@mapomodule/utils/helpers/objHelpers";
import { debounce } from "@mapomodule/utils/helpers/debounce";

export default {
  name: "ListTable",
  data: () => ({
    items: [],
    loading: true,
    selection: [],
    selectAll: false,
    options: {},
    httpPaginator: {},
    searchValue: "",
    loadingSearch: false,
    disableHttp: false
  }),
  props: {
    crud: {
      type: Object,
      required: true,
    },
    http: Boolean,
    navigable: Boolean,
    lookup: {
      type: String,
      default: "id",
    },
    detailLink: {
      type: Function,
      default(item) {
        return { path: `${this.$route.path}/${item[this.lookup]}` };
      },
    },
    filters: {
      type: Array,
      default: () => [],
    },
    searchable: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    selection(val) {
      this.$emit("input", val);
    },
    selectAll(val) {
      this.$emit("input", val ? "all" : this.selection);
    },
    filters: {
      deep: true,
      handler() {
        this.httpEnabled && this.getDataFromApi();
      },
    },
    options: {
      deep: true,
      handler(options) {
        this.disableHttp = options.itemsPerPage === -1;
        this.setQparams(options);
        this.httpEnabled && this.getDataFromApi(false);
      },
    },
    disableHttp() {
      this.getDataFromApi();
    },
  },
  methods: {
    getDataFromApi(clearSelection = true) {
      if (clearSelection) {
        this.selection = [];
        this.selectAll = false;
      }
      this.loading = true;
      this.httpEnabled && this.debouncedDataFromApi();
    },
    debouncedDataFromApi: debounce(function () {
      return new Promise((resolve, reject) => {
        this.selection = [];
        if (!this.httpEnabled) {
          this.crud
            .list()
            .then((data) => {
              this.items = data;
              this.loading = false;
              resolve(data);
            })
            .catch((error) => reject(error));
        } else {
          const params = this.getHttpParams();
          this.crud
            .list({ params })
            .then((data) => {
              this.items = data.items;
              this.httpPaginator = data.paginator;
              this.loading = false;
              resolve(data);
            })
            .catch((error) => reject(error));
        }
      });
    }, 500),
    setQparams(options) {
      this.$router.push({
        query: {
          ...this.$route.query,
          ...this.getOrderParams(options),
        },
      });
    },
    restoreFromQparams() {
      this.options = {
        ...this.options,
        sortBy: this.$route.query.sort?.split(",").map(p => p.replace(/^-/, '')) || [],
        sortDesc: this.$route.query.order?.split(",").map((p) => p.startsWith('-')) || [],
        itemsPerPage: parseInt(this.$route.query.items) || this.options.itemsPerPage || 10,
      };
      this.searchValue = this.$route.query.search;
    },
    getOrderParams(options) {
      const { sortBy, sortDesc, page, itemsPerPage } = options;
      const sort = sortBy.map((field, i) => (sortDesc[i] ? "-" : "") + field).join(",") || undefined;
      return { sort, items: itemsPerPage, page: page !== 1 ? page : undefined };
    },
    getHttpParams() {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(this.getOrderParams(this.options))) {
        value !== undefined && params.append(key, value);
      }
      this.filters.forEach((fi) => {
        const query = [];
        const format = (val) => val.replaceAll(".", "__");
        if (fi.datepicker) {
          const dates = fi.active[0].value.split(",");
          query.push(
            `${format(fi.value)}__gte=${dates[0]}`,
            `${format(fi.value)}__lte=${dates[1]}`
          );
        } else if (fi.active.length > 1) {
          query.push(`${format(fi.value)}=[${fi.active.map((a) => a.value).join(",")}]`);
        } else {
          query.push(`${format(fi.value)}=${fi.active[0].value}`);
        }
        query.forEach(q => params.append('fltr', q))
      });
      if (this.searchValue && this.searchable)
        params.append("search", this.searchValue);
      return params;
    },
    editItem(item) {
      this.$refs.editModal.open(item).then((r) => r && this.getDataFromApi());
    },
    deleteItem(item) {
      const callback = (item) =>
        this.crud.delete(item[this.lookup]).then(this.getDataFromApi);
      this.$mapo.$confirm
        .open({
          title: "Delete",
          question: "Are you sure you want to delete this item?",
          approveButton: { text: "Delete", attrs: { color: "red" } },
        })
        .then((res) => (res ? callback(item) : null));
    },
    filterSlots(slots, scope) {
      return Object.keys(slots)
        .filter((name) => name.startsWith(scope))
        .map((name) => name.replace(scope, ""));
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
    },
    changeSearch: debounce(function () {
      this.$router.push({
        query: {
          ...this.$route.query,
          search: this.searchValue,
        },
      });

      this.httpEnabled && this.getDataFromApi();
      this.loadingSearch = false;
    }, 1000)
  },
  computed: {
    filteredItems() {
      return this.filters.reduce(
        (result, filter) => {
          let handler;
          if (filter.datepicker) {
            handler = (el, filter) => (choice) => {
              let date = getPointed(el, filter.value, ""),
                dateObj = date && new Date(date).getTime(),
                range = choice.value.split(",").map((v, i) => {
                  let d = new Date(v);
                  d.setDate(d.getDate() + i);
                  return d;
                });
              return dateObj && dateObj >= range[0] && dateObj <= range[1];
            };
          } else {
            handler = (el, filter) => (choice) =>
              getPointed(el, filter.value, "") === choice.value;
          }
          return result.filter((el) => filter.active.some(handler(el, filter)));
        },
        [...this.items]
      );
    },
    firstColName() {
      return (
        this.$attrs.headers && this.$attrs.headers.length && this.$attrs.headers[0].value
      );
    },
    shouldEdit() {
      return (
        this.filterSlots(this.$slots, "qedit.body").length ||
        this.filterSlots(this.$scopedSlots, "qedit.body").length ||
        (this.$attrs.editFields && this.$attrs.editFields.length)
      );
    },
    httpEnabled() {
      return this.http && !this.disableHttp;
    },
  },
  mounted() {
    this.restoreFromQparams();
    this.httpEnabled || this.getDataFromApi();
  },
};
</script>
