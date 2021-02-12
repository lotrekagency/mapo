<template>
  <div class="detail__wrapper">

    <DetailPage v-if="typeSwitcher" :title="detailTitle" :permalink="detailPermalink" />

    <DetailDialog v-if="!typeSwitcher" />

  </div>
</template>

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";

.detail {
  &__wrapper {
    color: $b-1;
    hr {
      flex: 1 100%;
      max-width: 100%;
      margin: 1rem 0 2rem;
    }
  }
  &__core {
    margin: 2rem 0;
  }
}
</style>

<script>
export default {
  /*
    • detailTitle: the model's title.

    • detailPermalink: the model's URL, if it's a website page or so. 
      This value can be either a string or a null, which will hide the permalink UI
      in the DetailPage component.

    • typeSwitcher: leave it be, it works together with the type prop.
      When it's set to 'page', the DetailPage component will be rendered,
      otherwise if set to 'dialog', the DetailDialog component will activate.
  */
  data: () => ({
    detailTitle: 'Pagina dettaglio',
    detailPermalink: 'mapo.com/pagina',
  }),
  props: {
    type: String
  },
  methods: {
    typeHandler () {
      // Checking if it's either a page or dialog popup
      if(this.type === 'page') {
        this.typeSwitcher = true
      } else if(this.type === 'dialog') {
        this.typeSwitcher = false
      }
    }
  },
  created() {
    this.typeHandler();
  },
};
</script>