<template>
  <v-row>
    <v-col class="text-center">
      <Logo />
      <hr />
      <div class="user-info">
        <h3 v-html="$t('title').replace('{0}', this.$mapo.$auth.user.username)">
        </h3>
        <p>{{ $t("description") }}</p>
         <ul>
          <li>
            <strong>{{ $t("name") }}:</strong> {{ this.$mapo.$auth.user.info.first_name }}
          </li>
          <li>
            <strong>{{ $t("surname") }}:</strong> {{ this.$mapo.$auth.user.info.last_name }}
          </li>
          <li>
            <strong>Superuser:</strong>
            {{ this.$mapo.$auth.user.info.is_superuser }}
          </li>
          <li>
            <strong>Email:</strong> {{ this.$mapo.$auth.user.info.email }}
          </li>
           <li>
            <strong>{{ $t("role") }}:</strong> {{ this.$mapo.$auth.user.role }}
          </li>
          <li><strong>Token:</strong> {{ this.$mapo.$auth.user.token }}</li>
        </ul>
        <p></p>
        <p>{{ $t("perms") }}:</p>
        <ul>
          <li v-for="item in this.$mapo.$auth.user.permissions" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<i18n lang="yaml">
en:
  title: "Congrats <b>{0}</b>, you have authenticated successfully!"
  description: "Here some info about the user"
  name: "Name"
  surname: "Surname"
  role: "Role"
  perms: "Your user has the following permissions on this page"
it:
  title: "Complimenti <b>{0}</b>, ti sei autenticato correttamente"
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

<script>
export default {
  meta: { permissions: { model: "user" } },
  middleware: ["auth", "permissions"],
  mounted: function () {
    console.log(this.$mapo.$auth.user);
  },
};
</script>
