export function useCustomFetch<T>(
  url: string | (() => string),
  options: any,
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$customFetch,
  })
}
