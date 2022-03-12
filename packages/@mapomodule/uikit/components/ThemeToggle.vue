<template>
  <v-icon @click="toggleTheme">mdi-theme-light-dark</v-icon>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>