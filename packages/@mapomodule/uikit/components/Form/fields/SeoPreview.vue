<template>
  <div class="container">
    <div class="preview">
      <span class="preview__title">{{ getTitle }}</span>
      <br />
      <span class="preview__url">{{domain}}{{ getPermalink }}</span>
      <br />
      <span class="preview__desc">{{ getDescription }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background: #ffffff;
  border-radius: 3px;
}
.preview {
  display: block;
  max-width: 32em;
  margin: 30px 8px;
  &__title {
    color: #035ac6;
    font-size: 1.2em;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  &__url {
    color: green;
    font-size: 0.92em;
  }
  &__desc {
    color: #9b9da1;
  }
}
</style>

<script>
/**
 * This component is used to make a preview of seo data.
 */
export default {
  name: "SeoPreview",
  props: {
    // V-model for DetailField (need to be an object `{title, permalink, description}`)
    value:{
      type: Object,
      default: () => {}
    },
    // Seo title
    title: {
      type: String
    },
    // Seo permalink
    permalink: {
      type: String,
      default: "how-to-dive"
    },
    // Seo description
    description: {
      type: String
    },
    domain: {
      type: String,
      default: process.browser ? `${window.location.origin}/` : ""
    }
  },
  computed: {
    getTitle(){
      if (this.value && this.value.title)
        return this.value.title
      return this.title || this.$t("seoPreview.title")
    },
    getPermalink(){
      if (this.value && this.value.permalink)
        return this.value.permalink
      return this.permalink
    },
    getDescription(){
      if (this.value && this.value.description)
        return this.value.description
      return this.description || this.$t("seoPreview.description")
    }
  },

};
</script>
