<template>
  <v-hover v-slot="{ hover }">
    <div style="position: relative">
      <v-img
        v-if="child_media"
        :src="child_media.file"
        contain
        :height="size"
        :width="size"
        aspect-ratio="1"
      >
        <template v-slot:placeholder>
          <v-row
            v-if="child_media"
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey"
            ></v-progress-circular>
          </v-row>

          <v-btn v-else block text :height="size" @click="editing = true">
            <v-icon x-large>mdi-plus-box</v-icon>
          </v-btn>
        </template>
      </v-img>

      <media-manager-dialog
        v-model="editing"
        select="single"
        v-on:selectionChange="update"
        :dark="dark"
        :light="!dark"
      >
      </media-manager-dialog>

      <v-dialog v-model="confirm" max-width="290" :light="!dark" :dark="dark">
        <v-card>
          <v-card-title class="headline"> You sure? </v-card-title>
          <v-card-actions>
            <v-btn color="red darken-1" text @click="confirmDelete(true)">
              Yes
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDelete(false)"> No </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-overlay opacity="0.3" absolute :value="hover">
        <v-row>
          <v-col cols="6">
            <v-btn @click="editing = true" v-show="child_media" fab x-large>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-col>


          <v-col cols="6">
            <v-btn @click="confirm = true" v-show="child_media" fab x-large>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-overlay>
    </div>
  </v-hover>
</template>

<script>
export default {
  data() {
    return {
      editing: false,
      child_media: null,
      confirm: false,
    };
  },

  model: {
    prop: "media",
    event: "changed-media",
  },

  mounted() {
    if (this.media) this.child_media = this.media;
  },

  props: {
    media: {
      type: Object,
      default: () => null,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 400,
    },
  },

  methods: {
    update(selection) {
      this.child_media = selection;
      this.$emit("changed-media", selection);
    },
    confirmDelete(choice) {
      if (choice) {
        this.child_media = null;
        this.$emit("changed-media", null);
      }
      this.confirm = false;
    },
    hovering(event) {
      console.log("HOVER!");
    },
  },

  watch: {
    media() {
      this.child_media = this.media;
    },
  },
};
</script>