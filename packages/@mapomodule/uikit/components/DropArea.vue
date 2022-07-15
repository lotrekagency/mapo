<template>
  <v-card
    @drop.prevent="onDrop($event)"
    @dragover.prevent="dragover = true"
    @dragenter.prevent="dragover = true"
    @dragend.prevent="dragover = false"
    @dragleave.prevent="dragover = false"
    :class="{ 'grey darken-3': dragover }"
    v-bind="{ light, dark, elevation }"
  >
    <v-card-text>
      <v-row
        @click.stop="pickFile"
        class="d-flex flex-column cursor-pointer"
        dense
        align="center"
        justify="center"
      >
        <v-icon :class="[dragover ? 'mt-2, mb-6' : 'mt-5']" size="60">
          mdi-cloud-upload
        </v-icon>
        <p>{{ $t("dropArea_dropOrClick") }}</p>
        <input
          type="file"
          style="display: none"
          ref="fileInput"
          :multiple="multiple"
          @change="onFilePicked"
        />
      </v-row>
      <v-virtual-scroll
        :items="uploadedFiles"
        :height="uploadedFiles.length * 64 > 256 ? 256 : uploadedFiles.length * 64"
        item-height="64"
      >
        <template v-slot:default="{ item }">
          <v-list-item :key="item.info.name">
            <v-list-item-avatar tile v-if="item.info.objectURL">
              <v-img :src="item.info.objectURL"></v-img>
            </v-list-item-avatar>

            <v-list-item-content class="cursor-pointer" @click.stop="editItem(item)">
              <v-list-item-title>
                {{ item.info.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.info.type || "type/unknow" }}, {{ item.info.size }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn @click.stop="removeFile(item.info.name)" icon>
                <v-icon> mdi-close-circle </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Slot to provide custom button actions inside the drop area -->
      <slot v-bind:clearList="clearList" name="actions">
        <!-- `<v-btn @click="clearList" icon><v-icon>mdi-close</v-icon></v-btn>` -->
        <v-btn v-if="uploadedFiles && uploadedFiles.length" @click="clearList" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </slot>
    </v-card-actions>
    <v-dialog v-model="editDialog" v-bind="{ light, dark, elevation }" max-width="500px">
      <v-card v-if="editedItem">
        <v-card-title>
          <!-- Slot to provide custom edit card title. Exposes `editedItem`. -->
          <slot v-bind:editedItem="editedItem" name="editTitle">
            <!-- `<v-img v-if="editedItem.objectURL" max-height="200" contain :src="editedItem.objectURL"></v-img>` -->
            <v-img
              v-if="editedItem.objectURL"
              max-height="200"
              contain
              :src="editedItem.objectURL"
            ></v-img>
          </slot>
        </v-card-title>

        <v-card-text>
          <!-- Slot to provide custom edit card content. Exposes `editedItem`. -->
          <slot v-bind:editedItem="editedItem" name="editContent">
            <!-- `<v-container><v-row><v-col cols="12"><v-text-field v-model="editedItem.name" label="File name"></v-text-field></v-col></v-row></v-container>` -->
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.name"
                    :label="$t('fileName')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </slot>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeEdit">{{ $t("cancel") }}</v-btn>
          <v-btn color="primary" text @click="saveEdit">{{ $t("save") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>

<script>
import { humanFileSize } from "@mapomodule/utils/helpers/formatters";
/**
 * This component creates a drop area for uploads.
 * You can drag and drop over the button or click it to load the files.
 * When files are loaded into the component it will emit an event containing all the files.
 * This component will not take care of the actual file upload.
 *
 */
export default {
  name: "DropArea",
  props: {
    // This determines whether the component accepts multiple files or a single file.
    multiple: {
      type: Boolean,
      default: false,
    },
    // Light theme (style).
    light: {
      type: Boolean,
      default: false,
    },
    // Dark theme (style).
    dark: {
      type: Boolean,
      default: false,
    },
    // Elevation shadow (style).
    elevation: {
      // `Number|String`.
      type: Number | String,
      default: undefined,
    },
  },
  data() {
    return {
      editDialog: false,
      editedItem: null,
      editedIndex: -1,
      dragover: false,
      uploadedFiles: [],
    };
  },
  methods: {
    clearList() {
      this.uploadedFiles = [];
    },
    removeFile(fileName) {
      const index = this.uploadedFiles.findIndex((file) => file.info.name === fileName);
      if (index > -1) this.uploadedFiles.splice(index, 1);
    },
    pickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(e) {
      this.procesFiles(e.target.files);
    },
    onDrop(e) {
      this.dragover = false;
      this.procesFiles(e.dataTransfer.files);
    },
    procesFiles(files) {
      if (this.uploadedFiles.length > 0) this.uploadedFiles = [];
      if (!this.multiple && files.length > 1) {
        this.$mapo.$snack.open({
          message: this.$t("dropArea_onlyOneFile"),
          color: "error",
        });
      } else {
        const stack = [];
        for (let i = 0; i < files.length; i++) {
          stack.push(this.processFile(files[i]));
        }
        this.uploadedFiles = stack.slice();
      }
    },
    processFile(blob) {
      return {
        info: {
          objectURL: blob.type.startsWith("image/") ? URL.createObjectURL(blob) : null,
          name: blob.name,
          size: humanFileSize(blob.size, true, 2),
          type: blob.type,
        },
        blob,
      };
    },
    editItem(item) {
      this.editedIndex = this.uploadedFiles.indexOf(item);
      this.editedItem = Object.assign({}, item.info);
      this.editDialog = true;
    },
    saveEdit() {
      this.uploadedFiles[this.editedIndex].info = Object.assign({}, this.editedItem);
      this.closeEdit();
    },
    closeEdit() {
      this.editDialog = false;
      this.$nextTick(() => {
        this.editedItem = null;
        this.editedIndex = -1;
      });
    },
  },
  watch: {
    uploadedFiles(val) {
      /** Fires when the list of files loaded changes
       * @arg This emits a list of files in the format {info, blob} where the blob is a
       * [File](https://developer.mozilla.org/en-US/docs/Web/API/File) and info are some custom info about the file.
       */
      this.$emit("change", val);
    },
  },
};
</script>
