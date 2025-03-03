<template>
    <v-img
    :src="(isImage && media.file) || null"
    :lazy-src="(isImage && media.thumbnail) || null"
    aspect-ratio="1"
    class="grey lighten-2"
    :class="{
      'media-controls': mediaControls,
      'video-preview': videoPreview,
    }"
    v-bind="$attrs"
    v-on="videoListeners"
    @mouseover.native="hover = true"
    @mouseleave.native="hover = false; showInfo = false"
    :title="media.title || media.name"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          v-if="isImage"
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
        <div
          class="d-flex justify-center align-center"
          :class="{ playing }"
          style="width: 100%; height: 100%"
          v-else-if="isVideo"
        >
          <video
            :width="$attrs.contain && '100%'"
            height="100%"
            ref="video"
            :controls="mediaControls"
          >
            <source :src="media.file" :type="media.mime_type" />
          </video>
          <v-icon
            v-if="!mediaControls"
            :size="size"
            color="grey darken-4"
            class="grey lighten-2 rounded-circle video-preview-icon"
            >mdi-play</v-icon
          >
        </div>
        <div
          class="
            d-flex
            flex-column
            align-center
            justify-space-between
            fill-height
          "
          style="width: 100%"
          v-else
        >
          <div></div>
          <v-icon :size="size" color="grey darken-2">
            {{ isAudio ? "mdi-headphones" : "mdi-file" }}
          </v-icon>
          <audio v-if="isAudio && mediaControls" controls>
            <source :src="media.file" :type="media.mime_type" />
          </audio>
          <span
            class="grey--text text--darken-3 text-truncate pl-1 pr-8"
            style="width: 100%"
            >{{ (filename && name) || undefined }}</span
          >
        </div>
      </v-row>
    </template>
    <template>
      <div @click.stop="showInfo=true" class="file-info text-right" :class="{hover, showInfo}">
      <span class="file-name text-truncate">{{ (filename && name) || undefined }}</span>
      <span class="file-details text-caption " :class="{showInfo}">
        <span>{{ dateCreated }}</span><br>
        <span>{{ fileSize }}</span>
      </span>
      </div>
    </template>
  </v-img>
</template>

<style lang="scss">
.file-info{
  position: absolute;
  bottom: 0;
  padding: 0.2em 1em;
  background: #1f1f1f;
  opacity: 0;
  transition: opacity .5s;
  width: 100%;
  display: block;
  max-height: 80%;
  overflow: auto  ;
  &.hover{
    opacity: .7;
  }
  &.showInfo{
    opacity: .9;
    padding: 0.2em 0.5em;
    .file-name{
      font-weight: bold;
    }
  }
}
.file-name{
   display: block;
}
.file-details{
  max-height: 0;
  overflow: hidden;
  transition: all .5s;
  display: block;
  &.showInfo{
    max-height: 500px;
    overflow: auto;
  }
}
.v-image.media-controls {
  .v-image__placeholder {
    z-index: 0;
  }
}
.v-image.video-preview {
  .v-image__placeholder {
    height: calc(100% + 1px);
  }
}
.video-preview-icon.v-icon.v-icon {
  position: absolute;
  opacity: 0.5;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.playing .video-preview-icon.v-icon.v-icon {
  opacity: 0;
  transform: scale(1.2);
}
</style>

<script>
import { humanFileSize } from "@mapomodule/utils/helpers/formatters";

const extensions = {
  image: ["png", "jpg", "jpeg", "avif", "webp"],
  audio: ["mp3", "ogg", "flac"],
  video: ["mp4", "webm", "avi", "mov", "wmv"]
}

export default {
  data() {
    return {
      playing: false,
      playPromise: null,
      hover: false,
      showInfo: false
    };
  },
  props: {
    media: {
      type: Object,
      default: () => ({}),
    },
    filename: {
      type: Boolean,
      default: false,
    },
    iconSize: {
      type: String || Number,
      default: "70px",
    },
    videoPreview: {
      type: Boolean,
      default: false,
    },
    mediaControls: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    name() {
      return this.media && this.media.file && this.media.file.split("/").pop();
    },
    size() {
      return (
        (this.iconSize &&
          (typeof this.iconSize == "string"
            ? this.iconSize
            : this.iconSize + "px")) ||
        "70px"
      );
    },
    isImage() {
      if (this.media?.mime_type)
        return this.media.mime_type.startsWith("image/");
      return extensions.image.includes(this.media?.file?.split(".").pop()?.toLowerCase())
    },
    isVideo() {
      if (this.media?.mime_type)
        return this.media.mime_type.startsWith("video/");
      return extensions.video.includes(this.media?.file?.split(".").pop()?.toLowerCase())
    },
    isAudio() {
      if (this.media?.mime_type)
        return this.media.mime_type.startsWith("audio/");
      return extensions.audio.includes(this.media?.file?.split(".").pop()?.toLowerCase())
    },
    videoListeners() {
      if (this.isVideo && this.videoPreview) {
        return {
          mouseenter: this.startVideoPreview,
          mouseleave: this.stopVideoPreview,
          touchstart: this.handleTouch
        };
      }
    },
    fileSize() {
      return this.media && humanFileSize(this.media.size);
    },
    dateCreated() {
      return this.media && new Date(this.media.created).toLocaleDateString();
    },
  },
  methods: {
    handleTouch(event){
      const video = this.$refs.video;
      if (video && !this.playing) {
        this.startVideoPreview()
        event.preventDefault()
        event.stopPropagation()
      } else {
        this.stopVideoPreview()
      }
    },
    startVideoPreview() {
      const video = this.$refs.video;
      if (video && !this.playing) {
        video.loop = true;
        video.muted = true;
        video.currentTime = 1;
        this.playPromise = video.play().then(() => (this.playing = true));
      }
    },
    async stopVideoPreview() {
      if (this.playPromise) {
        await this.playPromise;
      }
      const video = this.$refs.video;
      if (video && this.playing) {
        video.currentTime = 0;
        video.pause();
        this.playing = false;
      }
    },
  },
};
</script>
