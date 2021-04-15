<template>
  <div>
    <ListHead v-bind="$attrs" />

    <div>
        <v-row class="mb-4">
          <v-col cols="12" md="4">
            <ListActions
              v-bind="$attrs"
              :crud="crud"
              :selection="selection"
              @actionCompleted="refresh"
            />
          </v-col>
          <v-col cols="12" md="8">
            <ListFilters v-bind="$attrs" v-model="filters">
              <template v-for="(_, slot) in $slots" :slot="slot">
                <slot :name="slot"></slot>
              </template>
              <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
                <slot :name="slot" v-bind="props" />
              </template>
            </ListFilters>
          </v-col>
        </v-row>
    </div>
    <div v-if="selection.length">
      {{ selection.length }} elementi selezionati
    </div>
    <div>
      <ListTable
        v-model="selection"
        v-bind="{...$attrs, crud, filters}"
        v-on="$listeners"
        ref="dtable"
      >
        <template v-for="(_, slot) in $slots" :slot="slot">
          <slot :name="slot"></slot>
        </template>
        <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
          <slot :name="slot" v-bind="props" />
        </template>
      </ListTable>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      tabActiveStatus: 1,
      selection: [],
      filters: []
    };
  },
  props: {
    endpoint: {
      type: String,
      required: true,
    },
  },
  computed: {
    crud() {
      return this.$mapo.$api.crud(this.endpoint);
    },
  },
  watch: {
    selection(val) {
      this.$emit("selectionChange", val);
    },
  },
  methods: {
    refresh() {
      return this.$refs.dtable.getDataFromApi();
    },
  },
  mounted() {},
};
</script>
