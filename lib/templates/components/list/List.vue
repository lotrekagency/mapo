<template>
  <div class="list__outer">
    <ListHead :title="pageTitle" />
    <ListTabs :tabActive='tabActiveStatus' />

    <div class="list__pretabs">
      <ListActions :actionStatus='actionStatus' :filterStatus='filterStatus' />
      <div class="list__counter">
        6 elementi
      </div>
    </div>

    <div class="list__core">
      <ListTable />
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '~bossamodule/assets/variables.scss';

.list {
  &__outer {
    color: $b-1;
    margin: 2rem;
  }
  &__pretabs {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__counter {
    margin-left: 1rem;
    font-size: 0.9rem;
  }
}
</style>

<script>
// •  tabActiveStatus sta ad evidenziare quale dei 3 tab è attivo
//    1 corrisponde a Tutto, 2 a Pubblicato, 3 a Cestinato
//
// •  actionStatus & filterStatus sono gli switcher per
//    abilitare o disabilitare le azioni di gruppo e i filtri
//    presenti nel componente ListActions
//
// •  pageTitle mi identifica il titolo della pagina dove sarà 
//    utilizzato il componente List
export default {
  data() {
    return {
      tabActiveStatus: 1,
      actionStatus: true,
      filterStatus: true
    };
  },
  props: {
    pageTitle: String
  }
};
</script>
