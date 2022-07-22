<template>
  <v-select
    :items="$i18n.locales"
    :value="$i18n.locale"
    @input="$i18n.setLocale($event)"
    dense
    flat
    hide-details
    solo
    background-color="transparent"
    item-value="code"
  >
    <template v-slot:selection="{ item }">
      {{ item.iso ? getFlag(item.iso) : item.name }}
    </template>
    <template v-slot:item="{ item, on, attrs }">
      <v-list-item v-on="on" v-bind="attrs">
        <v-list-item-icon class="mr-2">
          {{ item.iso ? getFlag(item.iso) : item.name }}
        </v-list-item-icon>
        <v-list-item-title>
          {{ item.name }}
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "LangSwitcher",
  methods: {
    getFlag(isoCode) {
      const codePoints = isoCode
        .split("-")
        .slice(-1)[0]
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    },
  },
};
</script>
