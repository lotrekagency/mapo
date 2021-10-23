<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">

      <v-btn
        class="elevation-0 rounded-0"
        color="primary"
        nuxt
        to="/login"
        style="margin-top: 1rem"
      >
        Test Login Page
      </v-btn>
      <hr />

      <div class="mapo-info">
        <h1 id="mapo">Mapo</h1>
        <h2 id="build-setup">Build Setup</h2>
        <h3 id="install-dependencies">install dependencies</h3>
        <p>$ yarn bootstrap</p>
        <h3 id="serve-with-hot-reload-at-localhost-3000">
          serve with hot reload at localhost:3000
        </h3>
        <p>$ yarn dev</p>
        <h3 id="to-install-this-module-in-a-nuxt-project">
          to install this module in a nuxt project
        </h3>
        <p>$ yarn add mapomodule</p>
        <h2 id="working-on-the-project">Working on the project</h2>
        <h3 id="how-to-contribute">How to contribute</h3>
        <p>
          Feel free to contribute to the project by making a
          <a
            href="https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request"
            >Pull Request</a
          >. Here&#39;s an example for a branch naming:
        </p>
        <p><code>feature/&lt;branch name&gt;</code></p>
        <p>
          Once you&#39;re done with your work and are ready to make a Pull
          Request, set the reviewers to Gabriele Baldi (bnznamco) and Andrea
          Morosi (andreamorosi).
        </p>
        <h3 id="documenting-components">Documenting components</h3>
        <p>
          Always write some documentation regarding the components you&#39;re
          developing. We are working on a StorybookJS implementation, which is
          going to help in this regard.
        </p>
        <h3 id="how-to-edit-and-add-configurations-and-settings">
          How to edit and add configurations and settings
        </h3>
        <p>
          Our library doesn&#39;t have a standard nuxt.config.js file, so in
          order to add the stuff which usually goes there you&#39;re going to
          either work on the defaults.js file, for configurations and such, or
          on the module.js file for modules and plugins. Both files are located
          in the root of the project.
        </p>
        <h3 id="urls-and-accessing-resources">URLs and accessing resources</h3>
        <p>
          We are using an alias (mapo) to access resources and files. Here&#39;s
          an example featuring a SCSS import in a component file:
        </p>
        <p>
          <code>@import &quot;@mapomodule/uikit/assets/custom-style.scss&quot;;</code>
        </p>
        <h2 id="external-resources">External resources</h2>
        <p>
          For detailed explanation on how things work, check out
          <a href="https://nuxtjs.org">Nuxt.js docs</a>.
        </p>
        <p>
          <a
            href="https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request"
            >https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request</a
          >
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.mapo-info {
  background: #333333;
  border-radius: 8px;
  margin: 10px 5%;
  padding: 10px;
}
</style>
<script>
export default {
  data() {
    return {};
  },
};
</script>
