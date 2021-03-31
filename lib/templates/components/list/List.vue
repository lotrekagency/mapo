<template>
  <div class="list__outer">
    <ListHead :title="pageTitle" />
    <ListTabs :tabActive="tabActiveStatus" />

    <div class="list__pretabs">
      <div class="list__actions">
        <ListActions
          v-bind="$attrs"
          :crud="crud"
          :selection="selection"
          @actionCompleted="refresh"
        />
        <ListFilters />
      </div>
    </div>
    <div v-if="selection.length" class="list__counter">
      {{ selection.length }} elementi selezionati
    </div>
    <div class="list__core">
      <ListTable
        v-model="selection"
        v-bind="$attrs"
        v-on="$listeners"
        :crud="crud"
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

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";

.list {
  &__outer {
    color: $b-1;
    margin: 2rem;
  }
  &__pretabs {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__counter {
    margin-left: 1rem;
    font-size: 0.9rem;
  }
  &__actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &__group {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 2rem;
      & > * {
        margin-right: 0.5rem;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      tabActiveStatus: 1,
      selection: [],
    };
  },
  props: {
    pageTitle: String,
    http: Boolean,
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
