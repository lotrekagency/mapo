<template>
  <div>
    <v-data-table
      v-model="selection"
      v-bind="$attrs"
      :headers="headers"
      :show-select="!dragOrderingActive && $attrs['show-select']"
      :items="serverPaginationEnabled ? items : filteredItems"
      :loading="loading"
      :options.sync="options"
      :search="searchString"
      :server-items-length="serverItemsLength"
      :class="{ mapo__listtable__all_selected: selectAll }"
      :item-key="lookup"
      :disable-sort="dragOrderingActive"
      v-sortable-data-table
      @sorted="changeOrder"
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
            :label="$t('mapo.search')"
            single-line
            hide-details
            outlined
            dense
            clearable
            :loading="loadingSearch"
            class="search-input rounded-0"
          ></v-text-field>
          <v-spacer></v-spacer>
          <slot name="dtable.top.center"></slot>
          <v-spacer></v-spacer>
          <v-btn text v-if="quickModeEnabled && userCan('add')" class="ml-2" @click="quickAction()">
            <v-icon small left class="d-none d-sm-block mr-2"> mdi-plus </v-icon>
            <span class="d-none d-sm-block">{{ $t("mapo.listTable.quickAdd") }}</span>
          </v-btn>
          <v-btn v-if="serverPaginationEnabled" class=" mx-sm-2 ma-2 mx-0" @click="getDataFromApi(false)" icon>
            <v-icon>mdi-update</v-icon>
          </v-btn>
        </v-toolbar>
        <slot name="dtable.top.under"></slot>
      </template>
      <template v-if="dragReorder" v-slot:footer.prepend>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" style="margin-left: 2px;" :class="{'primary--text': dragOrderingActive}" @click="dragOrderingActive = !dragOrderingActive" icon>
            <v-icon>mdi-order-bool-ascending</v-icon></v-btn>
          </template>
          <span>{{ $t("mapo.listTable.toggleOrder") }}</span>
        </v-tooltip>
      </template>
      <template v-if="navigable" v-slot:[`item.${firstColName}`]="{ item }">
        <NuxtLink :to="detailLink(item)">
          {{ getPointed(item, firstColName, "") || "Unknown" }}
        </NuxtLink>
      </template>
      <template v-slot:item.data-table-select="{ isSelected, select }" v-if="selectAll">
        <v-simple-checkbox v-model="selectAll" @input="select"></v-simple-checkbox>
      </template>
      <template v-slot:header.data-table-select="{ on, props }" v-if="selectAll">
        <v-simple-checkbox v-model="selectAll" @input="on.input"></v-simple-checkbox>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon :disabled="!userCan('change')" v-if="quickModeEnabled" small class="mr-2" @click="quickAction(item)">
          mdi-pencil
        </v-icon>
        <v-icon :disabled="!userCan('delete')" small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.drag-column>
        <v-icon class="handle-drag">mdi-drag</v-icon>
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
.handle-drag{ cursor: grab; }
</style>

<script>
import { getPointed } from "@mapomodule/utils/helpers/objHelpers";
import { debounce } from "@mapomodule/utils/helpers/debounce";
import { nameSpacedSlots } from "@mapomodule/utils/helpers/slots";

import Sortable from "sortablejs"

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
    dragOrderingActive: false
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
    dragReorder: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    sortableDataTable: {
      bind (el, binding, vnode) {
        const options = {
          animation: 150,
          handle: '.handle-drag',
          onUpdate: function (event) {
            vnode.child.$emit('sorted', event)
          },
        }
        Sortable.create(el.getElementsByTagName('tbody')[0], options)
      }
    }
  },
  watch: {
    selection(val) {
      this.$emit("input", val);
    },
    selectAll(val) {
      this.$emit("input", val ? "all" : this.selection);
    },
    dragOrderingActive(val) {
      if (val) {
        this.searchString = ""
        this.options = {...this.options, sortBy: []}
      }
      this.$emit("drag-order-change", val)
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
    nameSpacedSlots,
    getPointed,
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
    changeOrder(event){
      if (!this.offlineMode) {
        this.crud.update_order(this.items[event.oldIndex][this.lookup], this.items[event.newIndex][this.lookup]).then(
          res => res.reordered && this.getDataFromApi()
        ).catch(error => {
          this.getDataFromApi()
          this.$mapo.$snack.open({
            message: error.response?.data?.detail || this.$t("mapo.listTable.errorOrder"),
            color: "error",
          })
        });
      }
      const element = this.items[event.oldIndex]
      this.items.splice(event.oldIndex, 1, )
      this.items.splice(event.newIndex, 0, element);
    },
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
          title: this.$t("mapo.delete"),
          question: this.$t("mapo.confirmDelete"),
          approveButton: { text: this.$t("mapo.delete"), attrs: { color: "red", text: true } },
        })
        .then((res) => (res ? callback(item) : null));
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
    userCan(action) {
      if (this.$mapo.$auth.routeMiddlewares.includes("permissions")){
        return this.$mapo.$auth.user.permissions.includes(action)
      }
      return true
    },
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
    headers() {
      const dragColumn = { sortable: false, value: 'drag-column',  width: '64px' }
      return this.dragOrderingActive ? [ dragColumn,...this.$attrs.headers ] : this.$attrs.headers
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
