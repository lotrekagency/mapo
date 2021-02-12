<template>
  <div class="sidebar">
    <v-btn
      class="elevation-0 rounded-0 sidebar__btn"
      color="primary"
    >
      Salva
    </v-btn>
    <v-btn
      class="elevation-0 rounded-0 sidebar__btn"
      color="error"
      small
    >
      Elimina
    </v-btn>
    <div class="sidebar__card">
      <h3 class="sidebar__card__title">
        Titolo card 1
      </h3>
      <div class="sidebar__card__main">
        <div class="sidebar__card__row">
          <span class="sidebar__card__label">Stato:</span>
          <span class="sidebar__card__text">Pubblicato</span>
          <span class="sidebar__card__action">Modifica</span>
        </div><!--/sidebar__card__row-->
        <div class="sidebar__card__row">
          <span class="sidebar__card__label sidebar__card__label--full">Select</span>
          <v-select 
            class="sidebar__card__select" 
            label="Cambia opzione" outlined 
            dense hide-details light
          ></v-select>
        </div><!--/sidebar__card__row-->
      </div>
    </div><!--/sidebard__card-->
    <div class="sidebar__card">
      <h3 class="sidebar__card__title">
        Titolo card 2
      </h3>
      <div class="sidebar__card__main">
        <div class="sidebar__card__row">
          <p class="sidebar__card__content">
            Informazioni varie <br>
            Lorem ipsum dolor sit.
          </p>
        </div><!--/sidebar__card__row-->
      </div>
    </div><!--/sidebard__card-->
  </div><!--/sidebar-->
</template>

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";

.sidebar {
  flex: 1 1 calc(25% - 2rem);
  max-width: calc(25% - 2rem);
  padding: 0 0 0.5rem;
  margin-top: 1rem;
  margin-left: 2rem;
  &__btn {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }
  &__card {
    background: $white;
    border: 1px solid $w-3;
    border-radius: 4px;
    margin-bottom: 1rem;
    &__title {
      padding: 0.5rem;
      border-bottom: 1px solid $w-3;
      margin-bottom: 0.5rem;
      font-size: 1rem;

    }
    &__row {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0.5rem;
      flex-wrap: wrap;
      font-size: 0.9rem;
    }
    &__label {
      font-weight: bold;
      margin-right: 0.25rem;
      &--full {
        flex: 1 100%;
        max-width: 100%;
        margin-bottom: 0.25rem;
      }
    }
    &__text {
      margin-right: 0.25rem;
    }
    &__action {
      color: $g-1;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>