<template>
  <div>
    <v-checkbox
      v-for="(option, index) in options"
      :key="index"
      :label="option[itemText]"
      :input-value="isSelected(option)"
      @change="changed($event, option)"
    >
    </v-checkbox>
  </div>
</template>

<script>
export default {
  name: "M2mField",
  data() {
    return {
      proxyItems: []
    };
  },
  props: {
    value: Array,
    items: {
      type: Array,
      default: () => []
    },
    itemText: {
      type: String,
      default: "text"
    },
    itemValue: {
      type: String,
      default: "*"
    },
    lookup: {
      type: String,
      default: "id"
    },
    endPoint: String,
    mapping: {
      type: Function,
      default: items => items
    }
  },
  computed: {
    hasKey() {
      return this.itemValue !== "*";
    },
    options() {
      return this.mapping(this.proxyItems);
    }
  },
  methods: {
    isSelected(option) {
      return !!(this.value || []).find(
        e => e[this.lookup] == option[this.lookup]
      );
    },
    changed(value, option) {
      let val = this.hasKey ? option[this.itemValue] : option;
      let newArr = [...(this.value || [])];
      if (value) {
        newArr.push(val);
      } else {
        let i = newArr.findIndex(e => e[this.lookup] == option[this.lookup]);
        i !== -1 && newArr.splice(i, 1);
      }
      this.$emit("input", newArr);
    }
  },
  watch: {
    items(val) {
      this.proxyItems = val;
    }
  },
  mounted() {
    if (this.endPoint && (!this.items || !this.items.length)) {
      this.$mapo.$api
        .crud(this.endPoint)
        .list()
        .then(res => (this.proxyItems = res));
    }
  }
};
</script>