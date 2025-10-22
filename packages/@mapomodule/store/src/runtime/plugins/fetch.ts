import { defineNuxtPlugin, useNuxtApp } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  console.log("⚡️ Setting up custom fetch plugin")
  const $customFetch = $fetch.create({
    onResponse({ response }) {
      const $store = useNuxtApp().$store

      if (response.status === 401) {
        $store?.user?.logout()
      }

      if (response.status == 403) {
        $store?.app?.showSnackMessage({ message: "Permission denied..", color: "error" })
      }
    },
    async onResponseError({ request, response, error }) {
      const $store = useNuxtApp().$store

      const { status } = response || {}
      const baseURL = (this.baseURL || "").replace(/https?:\/\/[^\/]+/i, "")
      const logoutPath = `${baseURL.endsWith("/") ? baseURL : baseURL + "/"}${process.env.AUTH_LOGIN_URL || "api/auth/logout"}`

      if (status == 401 && request != logoutPath) {
        $store?.user?.logout()
      }
      if (status == 403) {
        $store?.app?.showSnackMessage({ message: "Permission denied..", color: "error" })
      }
      return Promise.reject(error)
    },
  })

  return {
    provide: {
      customFetch: $customFetch,
    },
  }
})
