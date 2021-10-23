<template>
  <div>
    <SnackBar />
    <ConfirmDialog ref="rootConfirmDialog" />
  </div>
</template>

<script>
export default {
  methods: {
    initConfirmDialog(count = 10) {
      this.$nextTick(() => {
        if (this.$refs.rootConfirmDialog) {
          this.$mapo.$confirm = this.$refs.rootConfirmDialog;
        } else if (count > 0) {
          this.initConfirmDialog(count - 1);
        }
      });
    }
  },
  mounted: function() {
    this.initConfirmDialog();
  }
};
</script>