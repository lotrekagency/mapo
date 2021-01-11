<template>
  <v-row justify="center" align="center">
    <v-col>
      <h2>LOGIN</h2>
      <v-form @submit.prevent="handleLogin(username, password)">
        <v-text-field
          v-model="username"
          label="Username"
          required
          outlined
          dark
          filled
          dense
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
          required
          outlined
          dense
          dark
          filled
          :type="showPass ? 'text' : 'password'"
        ></v-text-field>
        <div class="text-center">
          <v-btn type="submit" rounded dark> Log In </v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: "empty",
  data() {
    return {
      username: "",
      password: null,
      showPass: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = Object.keys(query).reduce((acc, cur) => {
            if (cur !== "redirect") {
              acc[cur] = query[cur];
            }
            return acc;
          }, {});
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin(username, password) {
      this.$store
        .dispatch("modules/user/login", {
          username: username,
          password: password,
        })
        .then(() => {
          this.$store.dispatch("modules/user/getInfo");
          this.$router.push({
            path: this.redirect || "/",
            query: this.otherQuery,
          });
        })
        .catch((err) => {
          this.hasErr = true;
          this.errMsg = err.message;
        });
    },
  },
};
</script>
<style lang="scss">
</style>
