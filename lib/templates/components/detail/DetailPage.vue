<template>
  <div class="detail__page">
    <div class="detail__head">
      <h2 class="detail__head__title display-1">{{title}}</h2>
      
      <v-text-field
        class="rounded-0 detail__head__textfield"
        label="Titolo pagina"
        v-model="title"
        outlined
        filled
        dense
        light
        required
      ></v-text-field>
    </div><!--/detail__head-->

    <div class="detail__page__main" v-bind:class="{ full: sidebar===false }">
      <hr>
      <div v-if="hasPermalink" class="detail__permalink">
        <span class="detail__permalink__title">Permalink:</span>
        <v-text-field
          class="rounded-0 detail__permalink__textfield"
          v-model="permalink"
          outlined
          filled
          dense
          light
          required
        ></v-text-field>
      </div>

      <div class="detail__core">
        <!--
          Here goes the editors and such ~

          Adding TinyMce as example, feel free to remove it
        -->
        <TinyMce />
      </div><!--/detail__core-->
    </div><!--/detail__page__main-->

    <DetailSidebar v-if="sidebar" />
  </div>
</template>

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";

.detail {
  &__page {
    margin: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    &__main {
      flex: 1 1 75%;
      max-width: 75%;
      &.full  {
        flex: 1 100%;
        max-width: 100%;
      }
    }
    hr {
      flex: 1 100%;
      max-width: 100%;
      margin: 1rem 0 2rem;
    }
  }
  &__head {
    flex: 1 1 100%;
    max-width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    flex-wrap: wrap;
    &__title {
      flex: 1 100%;
      max-width: 100%;
      margin-bottom: 1rem;
    }
    &__textfield {
      flex: 1 100%;
      max-width: 100%;
    }
  }
  &__permalink {
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    &__title {
      margin-right: 1rem;
      font-weight: bold;
    }
  }
}
</style>

<script>
/*
  • sidebar: true for enabling it, false for disabling it.
    This option will adapt the page's UI aswell.
*/
export default {
  data: () => ({
    hasPermalink: Boolean,
    sidebar: true
  }),
  props: {
    title: String,
    permalink: String
  },
  methods: {
    startup () {
      // Checking if the model has a permalink
      if(this.permalink === null) {
        this.hasPermalink = false
      } else {
        this.hasPermalink = true
      }
    }
  },
  created() {
    this.startup();
  },
};
</script>