<template>
  <MenuManager
    endpoint="api/camomilla/menus"
    :identifier="$route.params.detail"
    :additional-fields="fields"
    :max-depth="5"
  >
    <!-- <template
      v-slot:editor.form="{ model, currentLang, languages, errors, readonly }"
    >
      <Form
        v-model="model"
        class="menu-node-editor--form"
        :currentLang="currentLang"
        :languages="languages"
        :errors="errors"
        :fields="fields"
        :readonly="readonly"
      />
    </template> -->
  </MenuManager>
</template>

<script>
export default {
  meta: { sidebarHide: true, permissions: { model: "menu" } },
  middleware: ["auth", "permissions"],
  computed: {
    fields() {
      return [{ value: "immagine_di_copertina", type: "media" }];
    },
  },
};
</script>
