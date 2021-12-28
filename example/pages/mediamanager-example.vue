<template>
  <div class="fill-height">
    <MediaManager elevation="0" class="transparent" />
    <div class="btn__container">
      <media-manager-dialog
        v-model="dialog"
        :dark="darkTheme"
        :light="!darkTheme"
        select="multi"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2 mb-4" v-bind="attrs" v-on="on">
            Open media dialog
          </v-btn>
        </template>
      </media-manager-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn__container{
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 36px;
}
</style>

<script>
export default {
  data() {
    return {
      dialog: false,
      darkTheme: true,
    };
  },
};
</script>
