<template>
  <div class="list__head">
    <h2 class="list__head__title display-1">{{title}}</h2>
    <v-btn
      v-show="addItem"
      id="listHeadButton"
      class="rounded-0 elevation-0"
      color="primary"
      >Aggiungi nuovo</v-btn
    >
  </div>
</template>

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";

.list {
  &__head {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 4rem;
    &__title {
      margin-right: 2rem;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      addItem: false,
    };
  },
  props: {
    title: {
      type: String,
      default(){
        return this.$route.name
      }
    }
  },
  mounted: function () {

    // se c'è il pulsante per aggiungere un elemento nella data table CRUD
    // allora abilito il pulsante con stessa funzionalità nell'head
    if (document.querySelector("#tableAddItem")) {
      this.addItem = true;
      document.querySelector("#listHeadButton").addEventListener("click", () => {
        document.querySelector("#tableAddItem").click();
      });
    }
  },
};
</script>
