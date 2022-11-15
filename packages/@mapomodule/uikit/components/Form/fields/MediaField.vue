<template>
  <media-manager-dialog
    select="single"
    :selected.sync="model"
    v-bind="$attrs"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        readonly
        v-bind="{ ...$attrs, ...attrs }"
        v-on="readonly ? undefined : on"
        class="media-field--card rounded-0"
        :class="{ 'media-field--selected': !!model }"
        :value="model ? ' ' : ''"
      >
        <template v-if="model" v-slot:append>
          <MediaPreview
            v-if="model"
            :media="model"
            :video-preview="!model.is_image"
            class="media-field--preview"
          />
          <div class="media-field--info caption text--secondary">
            <p>
              <b>{{ $t("mapo.fileName") }}:</b> {{ fileName }}
            </p>
            <p>
              <b>{{ $t("mapo.size") }}:</b> {{ fileSize }}
            </p>
            <p>
              <b>{{ $t("mapo.mime") }}:</b> {{ model.mime_type }}
            </p>
            <p>
              <b>{{ $t("mapo.altTag") }}:</b> {{ model.alt_text }}
            </p>
          </div>
          <v-btn
            @click.native="clear"
            class="media-field--info-btn"
            tile
            small
            icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </template>
      </v-text-field>
    </template>
  </media-manager-dialog>
</template>
<style lang="scss">
.media-field--card.v-text-field > .v-input__control > .v-input__slot {
  input {
    cursor: pointer;
  }
}
.media-field--selected {
  .v-text-field__slot {
    position: absolute !important;
    width: calc(100% - 24px);
    height: 100%;
  }
  .v-input__append-inner {
    margin-left: 0 !important;
    width: 100%;
  }
  &.media-field--card.v-text-field > .v-input__control > .v-input__slot {
    cursor: pointer;
    input {
      position: absolute;
      cursor: pointer;
      width: 100%;
      min-height: 100%;
    }
  }
}

.media-field--preview {
  width: 100px;
  height: 100px;
  border: 1px solid;
  border-color: inherit;
  margin-bottom: 10px;
  margin-right: 12px;
}
.media-field--info {
  width: 100%;
  max-width: calc(100% - 112px);
  p {
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.media-field--add {
  width: 100px;
  margin-bottom: 10px;
}
</style>

<script>
import { humanFileSize } from "@mapomodule/utils/helpers/formatters";

/**
 * This component is made to manage media fields for single selection.
 */
export default {
  name: "MultimediaField",
  data() {
    return {
      model: this.value,
    };
  },
  props: {
    // V-model property. Color must be hex codified.
    value: {
      type: Object | null,
    },
    // This set the component status to readonly, stopping the user interaction.
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    fileName() {
      return this.model && this.model.file && this.model.file.split("/").pop();
    },
    dateCreated() {
      return this.model && new Date(this.model.created).toLocaleString();
    },
    fileSize() {
      return this.model && humanFileSize(this.model.size);
    },
  },
  methods:{
    clear(event){
      event.stopPropagation();
      this.model = null;
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
