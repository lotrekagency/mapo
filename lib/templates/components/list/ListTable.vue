<template>
  <div>
    <v-data-table
      v-model="selection"
      v-bind="$attrs"
      :items="items"
      :loading="loading"
      :options.sync="options"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-btn text v-if="shouldEdit" @click="editItem()">
            <v-icon small left class="mr-2"> mdi-plus </v-icon>
            Quick add
          </v-btn>
        </v-toolbar>
      </template>
      <template v-if="navigable" v-slot:[`item.${firstColName}`]="{ item }">
        <NuxtLink :to="detailLink(item)">
          {{ item[firstColName] }}
        </NuxtLink>
      </template>
      <template v-slot:item.actions="{ item }">
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
    <confirm-dialog
      v-bind="{ ...$attrs, value: false }"
      question="Are you sure you want to delete this item?"
      ref="delModal"
    ></confirm-dialog>
    <list-quick-edit
      v-if="shouldEdit"
      ref="editModal"
      v-bind="{ ...$attrs, value: false, crud }"
    >
      <template v-for="slot in filterSlots($slots, 'qedit.')" :slot="slot">
        <slot :name="`qedit.${slot}`"></slot>
      </template>
      <template
        v-for="slot in filterSlots($scopedSlots, 'qedit.')"
        v-slot:[slot]="props"
      >
        <slot :name="`qedit.${slot}`" v-bind="props" />
      </template>
    </list-quick-edit>
  </div>
</template>


<script>
export default {
  data: () => ({
    items: [],
    loading: true,
    selection: [],
    options: {},
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
  },
  watch: {
    selection(val) {
      this.$emit("input", val);
    },
    options(option) {
      const { sortBy, sortDesc, page } = option;
      const sort = sortBy.length ? sortBy.join(".") : undefined;
      const order = sortDesc.length ? sortDesc.map((e) => (e ? "desc" : "asc")).join(".") : undefined;
      this.$router.push({
        query: {
          ...this.$route.query,
          page: page !== 1 ? page : undefined,
          sort, order,
        },
      });
    },
  },
  mounted() {
    this.options = {
      ...this.options,
      sortBy: this.$route.query.sort?.split(".") || [],
      sortDesc:
        this.$route.query.order?.split(".").map((e) => e == "desc") || [],
    };
    this.getDataFromApi();
  },

  methods: {
    getDataFromApi() {
      return new Promise((resolve, reject) => {
        this.selection = [];
        this.loading = true;
        this.crud
          .list()
          .then((data) => {
            this.items = data;
            this.loading = false;
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    editItem(item) {
      this.$refs.editModal.open(item).then((r) => r && this.getDataFromApi());
    },
    deleteItem(item) {
      const callback = (item) =>
        this.crud.delete(item[this.lookup]).then(this.getDataFromApi);
      this.$refs.delModal.open().then((res) => (res ? callback(item) : null));
    },
    filterSlots(slots, scope) {
      return Object.keys(slots)
        .filter((name) => name.startsWith(scope))
        .map((name) => name.replace(scope, ""));
    },
  },
  computed: {
    firstColName() {
      return (
        this.$attrs.headers &&
        this.$attrs.headers.length &&
        this.$attrs.headers[0].value
      );
    },
    shouldEdit() {
      return (
        this.filterSlots(this.$slots, "qedit.body").length ||
        this.filterSlots(this.$scopedSlots, "qedit.body").length ||
        (this.$attrs.editFields && this.$attrs.editFields.length)
      );
    },
  },
};
</script>