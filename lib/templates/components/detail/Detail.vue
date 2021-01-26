<template>
  <div class="detail__wrapper">

    <DetailPage :title="detailTitle" :permalink="detailPermalink" />

    <!-- 
        ∆
       ∆∆∆   
      ∆∆∆∆∆
      WIP: I wanna make the DetailPopup component aswell,
      to edit the details of some model on the go.
    -->

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
  */
  data: () => ({
    detailTitle: 'Pagina dettaglio',
    detailPermalink: 'mapo.com/pagina'
  })
};
</script>