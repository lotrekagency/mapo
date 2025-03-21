<template>
  <div class="login__wrapper">
    <div class="login__inner">
      <h2 class="login__inner__title">{{ $t("mapo.login") }}</h2>

      <div class="login__form__outer">
        <v-form
          @submit.prevent="handleLogin(username, password)"
          class="login__form"
        >
          <v-text-field
            class="rounded-0"
            v-model="username"
            label="Username"
            required
            outlined
            filled
            dense
            light
            :error-messages="errors.username"
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
            :error-messages="errors.password"
            :type="showPass ? 'text' : 'password'"
          ></v-text-field>
          <div class="text-center">
            <v-btn type="submit" class="rounded-0" elevation="0" dark>
              {{ $t("mapo.login") }}
            </v-btn>
            <v-messages
              v-model="errors.non_field_errors"
              color="error"
              class="mt-4 text-center"
            />
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const { $mapo } = useNuxtApp();
    return { $mapo };
  },
  data() {
    return {
      username: "",
      password: null,
      showPass: false,
      errors: {}
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
      this.$mapo.$auth
        .login({ username, password })
        .then(() =>
          this.$router.push({
            path: this.redirect || "/",
            query: this.otherQuery,
          })
        )
        .catch((error) => {
          this.errors = error.response?.data || {}
          if (!Object.keys(this.errors).length){
            this.$mapo.$snack.open({message: this.$t("mapo.loginError"), color: "error"})
          }
        });
    },
  },
};
</script>

<style lang="scss">
@use "../assets/variables.scss" as v;
.login {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: v.$w-1;
    color: v.$black;
    height: 100%;
  }
  &__inner {
    padding: 1rem;
    width: 300px;
    &__title {
      font-size: 2rem;
      border-bottom: 2px solid v.$black;
    }
  }
  &__form {
    &__outer {
      margin-top: 1rem;
    }
  }
}
</style>
