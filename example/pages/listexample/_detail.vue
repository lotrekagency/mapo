<template>
  <Detail :type="detailType" />
</template>

<script>
/*
  • detailType: values must be 'page' or 'dialog'.
    • 'page': the detail component will be enabled for an edit page.
    • 'dialog': the detail component will be enabled to act as a 
      popup window instead of a classic page.
*/
export default {
  data: () => ({
    detailType: 'page'
  }),
  meta: {
    sidebarHide: true
  }
};
</script>