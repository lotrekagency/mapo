
<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            {{ firstCol }}
          </th>
          <th class="text-left">
            {{ secondCol }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in itemsList"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<style lang="scss" scoped>
@import '~assets/variables.scss';

.sidebar {
  &__core {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: $b-1;
    color: $white;
  }
}
</style>

<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      firstCol: String,
      secondCol: String,
      itemsList: Array
    },
    mounted: function () {
      console.log(Object.keys(this.itemsList).length)
    }
  }
</script>
