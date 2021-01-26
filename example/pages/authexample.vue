<template>
  <v-row>
    <v-col class="text-center">
      <Logo />
      <hr />
      <div class="user-info">
        <h3>
          {{ $t('auth_congrats', { name: this.$mapo.$auth.user.username }) }}
        </h3>
        <p>{{ $t('auth_someinfo') }}</p>
         <ul>
          <li>
            <strong>{{ $t('auth_name') }}</strong> {{ this.$mapo.$auth.user.info.first_name }}
          </li>
          <li>
            <strong>{{ $t('auth_surname') }}</strong> {{ this.$mapo.$auth.user.info.last_name }}
          </li>
          <li>
            <strong>{{ $t('auth_superuser') }}</strong>
            {{ this.$mapo.$auth.user.info.is_superuser }}
          </li>
          <li>
            <strong>{{ $t('auth_email') }}</strong> {{ this.$mapo.$auth.user.info.email }}
          </li>
           <li>
            <strong>{{ $t('auth_role') }}</strong> {{ this.$mapo.$auth.user.role }}
          </li>
          <li><strong>{{ $t('auth_token') }}</strong> {{ this.$mapo.$auth.user.token }}</li>
        </ul>
        <p></p>
        <p>{{ $t('auth_permission') }}</p>
        <ul>
          <li v-for="item in this.$mapo.$auth.user.permissions" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.user-info {
  background: #333333;
  border-radius: 8px;
  margin: 10px 20%;
}
</style>

<script>
export default {
  name: "Prova",
  meta: { permissions: { model: "user" } },
  //middleware: ["auth", "permissions"],
  mounted: function () {
    console.log(this.$mapo.$auth.user);
  },
  nuxtI18n: {
    paths: {
      en: '/authExample', // -> Custom Path if we want change the url on specific lang for this page
      it: '/esempioAuth', 
    }
  }
};
</script>