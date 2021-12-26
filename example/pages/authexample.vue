<template>
  <v-row>
    <v-col class="text-center">
      <Logo />
      <hr />
      <div class="user-info">
        <h3>
          Congrats <strong>{{ this.$mapo.$auth.user.username }}</strong
          >, you have authenticated sucesfully!
        </h3>
        <p>Here some info about the user</p>
         <ul>
          <li>
            <strong>Name:</strong> {{ this.$mapo.$auth.user.info.first_name }}
          </li>
          <li>
            <strong>Surname:</strong> {{ this.$mapo.$auth.user.info.last_name }}
          </li>
          <li>
            <strong>Superuser:</strong>
            {{ this.$mapo.$auth.user.info.is_superuser }}
          </li>
          <li>
            <strong>Email:</strong> {{ this.$mapo.$auth.user.info.email }}
          </li>
           <li>
            <strong>Role:</strong> {{ this.$mapo.$auth.user.role }}
          </li>
          <li><strong>Token:</strong> {{ this.$mapo.$auth.user.token }}</li>
        </ul>
        <p></p>
        <p>Your user has the following permissions on this page:</p>
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