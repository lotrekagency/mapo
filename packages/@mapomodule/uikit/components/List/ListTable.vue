<template>
  <div>
    <v-data-table
      v-model="selection"
      v-bind="$attrs"
      :items="serverPaginationEnabled ? items : filteredItems"
      :loading="loading"
      :options.sync="options"
      :search="searchString"
      :server-items-length="serverItemsLength"
      :class="{ mapo__listtable__all_selected: selectAll }"
      :item-key="lookup"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-if="searchable"
            v-model="searchString"
            @input="
              loadingSearch = serverPaginationEnabled;
              search();
            "
            prepend-inner-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            outlined
            dense
            clearable
            :loading="loadingSearch"
            class="search-input"
          ></v-text-field>
          <v-spacer></v-spacer>
          <slot name="dtable.top.center"></slot>
          <v-spacer></v-spacer>
          <v-btn text v-if="quickModeEnabled" class="ml-2" @click="quickAction()">
            <v-icon small left class="d-none d-sm-block mr-2"> mdi-plus </v-icon>
            <span class="d-none d-sm-block">Quick</span> add
          </v-btn>
          <v-btn v-if="serverPaginationEnabled" class=" mx-sm-2 ma-2 mx-0" @click="getDataFromApi(false)" icon>
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
        <v-icon v-if="quickModeEnabled" small class="mr-2" @click="quickAction(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-for="slot in nameSpacedSlots($slots, 'dtable.')" :slot="slot">
        <slot :name="`dtable.${slot}`"></slot>
      </template>
      <template
        v-for="slot in nameSpacedSlots($scopedSlots, 'dtable.')"
        v-slot:[slot]="props"
      >
        <slot :name="`dtable.${slot}`" v-bind="props" />
      </template>
    </v-data-table>
    <list-quick-edit
      v-if="quickModeEnabled"
      ref="editModal"
      :offline="offlineMode"
      v-bind="{ ...$attrs, value: false, crud, lookup: lookup }"
    >
      <template v-for="slot in nameSpacedSlots($slots, 'qedit.')" :slot="slot">
        <slot :name="`qedit.${slot}`"></slot>
      </template>
      <template v-for="slot in nameSpacedSlots($scopedSlots, 'qedit.')" v-slot:[slot]="props">
        <slot :name="`qedit.${slot}`" v-bind="props" />
      </template>
    </list-quick-edit>
  </div>
</template>

<style lang="scss" scoped>
.mapo__listtable__all_selected {
  .v-data-table__selected {
    background: none !important;
  }
}
.search-input{
  max-width: 300px;
 @media (max-width: 400px) {
    &.v-input--is-focused{
    position: absolute;
    z-index: 1;
    width: calc(100% - 32px);
    &.theme--dark{
      background: #272727;
    }
    &.theme--light{
      background: #fff;
    }
  }
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
    searchString: "",
    loadingSearch: false,
    noPagination: false,
  }),
  props: {
    crud: {
      type: Object,
      required: true
    },
    serverPagination: Boolean,
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
    data: {
      type: Array,
      required: false
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
        this.serverPaginationEnabled && this.getDataFromApi();
      },
    },
    options: {
      deep: true,
      handler(options) {
        this.noPagination = options.itemsPerPage === -1;
        this.setQparams(options);
        this.serverPaginationEnabled && this.getDataFromApi(false);
      },
    },
    noPagination() {
      this.getDataFromApi();
    },
    data: {
      deep: true,
      handler(data) {
        if (data) this.items = data;
      },
    }
  },
  methods: {
    getDataFromApi(clearSelection = true) {
      if (clearSelection) {
        this.selection = [];
        this.selectAll = false;
      }
      this.loading = !this.offlineMode;
      !this.offlineMode && this.debouncedDataFromApi();
    },
    debouncedDataFromApi: debounce(function () {
      return new Promise((resolve, reject) => {
        this.selection = [];
        if (!this.serverPaginationEnabled) {
          this.crud
            .list()
            .then((data) => {
              this.items = data;
              this.loading = false;
              this.httpPaginator = {};
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
        sortBy:
          this.$route.query.sort?.split(",").map((p) => p.replace(/^-/, "")) ||
          this.options.sortBy ||
          [],
        sortDesc:
          this.$route.query.order?.split(",").map((p) => p.startsWith("-")) ||
          this.options.sortDesc ||
          [],
        itemsPerPage:
          parseInt(this.$route.query.items) || this.options.itemsPerPage || 10,
        page: parseInt(this.$route.query.page) || this.options.page || 1,
      };
      this.searchString = this.$route.query.search;
    },
    getOrderParams(options) {
      const { sortBy, sortDesc, page, itemsPerPage } = options;
      const sort =
        sortBy.map((field, i) => (sortDesc[i] ? "-" : "") + field).join(",") || undefined;
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
        query.forEach((q) => params.append("fltr", q));
      });
      if (this.searchString && this.searchable) params.append("search", this.searchString);
      return params;
    },
    quickAction(item) {
      this.$refs.editModal.open(item).then((r) => {
        if (!r) return;
        if (!this.offlineMode) {
          this.getDataFromApi();
        } else {
          let index = item ? this.items.findIndex((i) => i[this.lookup] === item[this.lookup]) : -1;
          let update = true;

          if (index !== -1) {
            this.items.splice(index, 1, r);
          } else {
            index = this.items.push(r);
            update = false;
          }
          this.$emit("update:data", this.items, r, index);
        }
      });
    },
    deleteItem(item) {
      const callback = (item) => {
        if (!this.offlineMode) {
          this.crud.delete(item[this.lookup]).then(this.getDataFromApi);
        } else {
          const index = this.items.findIndex((i) => i[this.lookup] === item[this.lookup]);

          if (index !== -1) {
            this.items.splice(index, 1);
            this.$emit("update:data", this.items, r, index);
          }
        }
      };

      this.$mapo.$confirm
        .open({
          title: "Delete",
          question: "Are you sure you want to delete this item?",
          approveButton: { text: "Delete", attrs: { color: "red" } },
        })
        .then((res) => (res ? callback(item) : null));
    },
    nameSpacedSlots(slots, scope) {
      return Object.keys(slots)
        .filter((name) => name.startsWith(scope))
        .map((name) => name.replace(scope, ""));
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
    },
    search: debounce(function () {
      this.$router.push({
        query: {
          ...this.$route.query,
          search: this.searchString || undefined,
        },
      });

      this.serverPaginationEnabled && this.getDataFromApi();
      this.loadingSearch = false;
    }, 1000),
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
    quickModeEnabled() {
      return (
        this.nameSpacedSlots(this.$slots, "qedit.body").length ||
        this.nameSpacedSlots(this.$scopedSlots, "qedit.body").length ||
        (this.$attrs.editFields && this.$attrs.editFields.length)
      );
    },
    serverPaginationEnabled() {
      return this.serverPagination && !this.noPagination && !this.offlineMode;
    },
    offlineMode() {
      return !!this.data;
    },
    serverItemsLength() {
      return this.httpPaginator.count || (this.serverPaginationEnabled && (this.options.page * this.options.itemsPerPage)) || -1;
    },
  },
  mounted() {
    this.restoreFromQparams();
    if (!this.offlineMode) {
      this.getDataFromApi();
    } else {
      this.items = this.data;
      this.loading = false;
    }
  },
};
</script>
