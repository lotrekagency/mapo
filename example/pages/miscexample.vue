<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <v-btn dark class="mb-2" @click.native="readonly = !readonly">
          {{ readonly ? $t("enable") : $t("disable") }}
        </v-btn>
        <wygEditor v-model="tinyInput" :readonly="readonly" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <v-btn dark class="mb-2" @click.native="readonly = !readonly">
          {{ readonly ? $t("enable") : $t("disable") }}
        </v-btn>
        <wygEditorCKE v-model="ckeInput" :readonly="readonly" />
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n lang="yaml">
en:
  enable: "Enable editor"
  disable: "Disable editor"
it:
  enable: "Abilita editor"
  disable: "Disabilita editor"
</i18n>

<script>
export default {
  data() {
    return {
      readonly: false,
      tinyInput: `
        <p style="text-align: center;"><span style="color: #bdc3c7;">&rarr; This is a full-featured editor demo. Please explore!
        &larr;</span></p>
        <p style="text-align: center;">&nbsp;</p>
        <h2 style="text-align: center;">TinyMCE is the world's most customizable, and flexible, rich text editor.</h2>
        <p style="text-align: center;"><strong> <span style="font-size: 14pt;"> <span style="color: #7e8c8d; font-weight: 600;">
                        A featherweight download, TinyMCE can handle any challenge you throw at it. </span> </span> </strong>
        </p>
        <p style="text-align: center;">&nbsp;</p>
        <table style="border-collapse: collapse; width: 85%; margin-left: auto; margin-right: auto; border: 0;">
            <tbody>
                <tr>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">🛠 50+
                            Plugins</span></td>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">💡 Premium
                            Support</span></td>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">🖍 Custom
                            Skins</span></td>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">⚙ Full API
                            Access</span></td>
                </tr>
            </tbody>
        </table>
      `,
      ckeInput: `<article>
                  <h1>
                      HTML playground
                  </h1>
                  <p data-foo="bar">
                      This is a sample paragraph with a <code><strong>data</strong></code><strong> attribute</strong>.
                  </p>
                  <section>
                      <h2>
                          Responsive column layout
                      </h2>
                      <p data-foo="bar">
                      <img alt="null" src="https://camomilla.lotrek.io/_nuxt/img/camomilla-logo.799c556.png" width="300px" />
                      </p>
                  </section>
              </article>
      `,
    };
  },
};
</script>
