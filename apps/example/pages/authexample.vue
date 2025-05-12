<template>
  <v-row>
    <v-col class="text-center">
      <Logo />
      <hr />
      <div class="user-info">
        <h3 v-html="$t('title').replace('{0}', $mapo.$auth.user.username)">
        </h3>
        <p>{{ $t("description") }}</p>
         <ul>
          <li>
            <strong>{{ $t("name") }}:</strong> {{ $mapo.$auth.user.info.first_name }}
          </li>
          <li>
            <strong>{{ $t("surname") }}:</strong> {{ $mapo.$auth.user.info.last_name }}
          </li>
          <li>
            <strong>Superuser:</strong>
            {{ $mapo.$auth.user.info.is_superuser }}
          </li>
          <li>
            <strong>Email:</strong> {{ $mapo.$auth.user.info.email }}
          </li>
           <li>
            <strong>{{ $t("role") }}:</strong> {{ $mapo.$auth.user.role }}
          </li>
          <li><strong>Token:</strong> {{ $mapo.$auth.user.token }}</li>
        </ul>
        <p></p>
        <p>{{ $t("perms") }}:</p>
        <ul>
          <li v-for="item in $mapo.$auth.user.permissions" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<i18n lang="yaml">
en:
  title: "Congrats, you have authenticated successfully!"
  description: "Here some info about the user"
  name: "Name"
  surname: "Surname"
  role: "Role"
  perms: "Your user has the following permissions on this page"
it:
  title: "Complimenti, ti sei autenticato correttamente"
  description: "Alcune informazioni sull'utente"
  name: "Nome"
  surname: "Cognome"
  role: "Ruolo"
  perms: "Permessi dell'utente in questa pagina"
</i18n>

<style scoped>
.user-info {
  border-radius: 8px;
  border: 3px solid #333333;
  padding: 1rem;
  margin: 10px 20%;
}
</style>

<script setup lang="ts">

const $mapo = useNuxtApp().$mapo;

definePageMeta({
  meta: { permissions: { model: "user" } },
  middleware: ["auth", "permissions"],
})

onMounted(() => {
  console.log(useNuxtApp().$mapo.$auth.user);
});
</script>
