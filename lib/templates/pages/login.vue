<template>
  <div class="login__wrapper">
    <div class="login__inner">
      <h2 class="login__inner__title">Login</h2>

      <div class="login__form__outer">
        <v-form @submit.prevent="handleLogin(username, password)" class="login__form">
          <v-text-field
            class="rounded-0"
            v-model="username"
            label="Username"
            required
            outlined
            filled
            dense
            light
          ></v-text-field>
          <v-text-field
            class="rounded-0"
            v-model="password"
            label="Password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
            required
            outlined
            dense
            filled
            light
            :type="showPass ? 'text' : 'password'"
          ></v-text-field>
          <div class="text-center">
            <v-btn type="submit" class="rounded-0" elevation="0" dark> Log In </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
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
        .dispatch("bossa/login", {
          username: username,
          password: password,
        })
        .then(() => {
          this.$store.dispatch("bossa/getInfo");
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
@import '~bossamodule/assets/variables.scss';

.login {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $w-1;
    color: $black;
    height: 100%;
  }
  &__inner {
    padding: 1rem;
    width: 300px;
    &__title {
      font-size: 2rem;
      border-bottom: 2px solid $black;
    }
  }
  &__form {
    &__outer {
      margin-top: 1rem;
    }
  }
}
</style>
