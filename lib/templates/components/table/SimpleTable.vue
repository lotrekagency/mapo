
<template>
  <v-simple-table class="elevation-0 rounded-0">
    <template v-slot:default>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.text" class="text-left">
            {{header.text}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itemsList" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    headers: Array,
    itemsList: Array,
  },
  mounted: function () {
  },
};
</script>
