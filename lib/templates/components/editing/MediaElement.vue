<template>
  <v-row>
    <v-col cols="12">
      <v-card
        :dark="this.dark"
        :light="!this.dark"
      >
        <v-img
            v-if="child_media"
            :src="child_media.file"
            aspect-ratio="1"
        > </v-img>

        <v-btn v-else block text height="300" @click="editing = true">
          <v-icon x-large>mdi-plus-box</v-icon>
        </v-btn>

        <media-manager-dialog
          v-model="editing"
          select="single"
          v-on:selectionChange="update"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              v-if="child_media"
              absolute
              fab
              bottom
              right
              class="mb-10 mr-15"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
        </media-manager-dialog>

        <v-btn
            v-if="child_media"
            fab
            absolute
            bottom
            right
            class="mb-10"
            @click="remove"
        >
            <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      editing: false,
      child_media: null,
    };
  },

  model: {
    prop: "media",
    event: "changed-media",
  },

  mounted(){
    if(this.media)
        this.child_media=this.media
  },

  props: {
    media: {
      type: Object,
      default: () => null,
    },
    dark: {
        type: Boolean,
        default: () => false,
    },
  },

  methods: {
    update(selection) {
      this.child_media=selection
      this.$emit("changed-media", selection);
    },
    remove(){
        this.child_media=null
        this.$emit("changed-media", null);
    }
  },

  watch: {
      media(){
          this.child_media=this.media
      }
  }

};
</script>