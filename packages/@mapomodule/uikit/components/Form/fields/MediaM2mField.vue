<template>
  <div class="media-m2m--wrapper">
    <v-text-field
      readonly
      v-bind="$attrs"
      @click="hasSelection || editSelection()"
      class="media-m2m--card"
      :class="{ 'media-m2m--selected': !!hasSelection }"
      :value="hasSelection ? ' ' : ''"
    >
      <template v-slot:append>
        <v-btn v-if="hasSelection" @click="editSelection" tile small>{{
          $t("mapo.mediaM2MField.editSelection")
        }}</v-btn>
        <v-virtual-scroll
          v-if="hasSelection"
          :items="model"
          :height="model.length * 64 > 256 ? 256 : model.length * 64"
          item-height="64"
        >
          <template v-slot:default="{ item }">
            <v-divider></v-divider>
            <v-list-item class="media-m2m--item" :key="item.id">
              <v-list-item-avatar tile>
                <MediaPreview
                  :media="item"
                  :video-preview="!item.is_image"
                  class="media-m2m--preview"
                  icon-size="30"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text--secondary">
                  {{ item.file.split("/").pop() }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ item.mime_type || "type/unknow" }},
                    {{ humanFileSize(item.size) }},
                    {{ formatDate(item.created) }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click.stop="removeItem(item)" small icon>
                  <v-icon class="text--secondary"> mdi-close-circle </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
      </template>
    </v-text-field>

    <media-manager-dialog
      v-model="dialog"
      select="multi"
      :selected.sync="model"
    >
    </media-manager-dialog>
  </div>
</template>

<style lang="scss">
.media-m2m--card.v-text-field > .v-input__control > .v-input__slot {
  input {
    cursor: pointer;
  }
}
.v-text-field__slot {
  cursor: default;
}
.media-m2m--selected {
  .v-text-field__slot {
    position: absolute !important;
    width: 100%;
    height: 100%;
    cursor: default;
  }
  .v-input__append-inner {
    cursor: default;
    margin-left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &.media-m2m--card.v-text-field > .v-input__control > .v-input__slot input {
    display: none;
  }
}
.media-m2m--card {
  border-radius: inherit;
}
</style>

<script>
import { humanFileSize } from "@mapomodule/utils/helpers/formatters";

/**
 * This component is made to manage media fields for multiple selection.
 */

export default {
  name: "MediaM2mField",
  data() {
    return {
      model: this.value,
      dialog: false,
    };
  },
  props: {
    // V-model property. It is the attribute to be modified.
    value: {
      type: Array | null,
      required: true,
    },
  },
  computed: {
    hasSelection() {
      return this.model && this.model.length > 0;
    },
  },
  methods: {
    humanFileSize,
    formatDate(val) {
      return val && new Date(val).toLocaleString();
    },
    removeItem(media) {
      this.model = this.model.filter(({ id }) => id != media.id);
    },
    editSelection(){
      if (!this.readonly)
        this.dialog = true;
    }
  },
  watch: {
    value(val) {
      this.model = val;
    },
    model(val) {
      this.$emit("input", val);
    },
  },
};
</script>
