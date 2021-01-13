import { createRoutes } from '@nuxt/utils'

const pages = ['pages/login.vue', 'pages/index.vue', 'pages/inspire.vue']



export default function NuxtModule() {
    console.log('Injecting BossaPages')
    const { routeNameSplitter, trailingSlash } = this.options.router
    this.extendRoutes((routes) => {
      routes.push(...createRoutes({
        files: pages,
        srcDir: __dirname,
        pagesDir: 'pages',
        routeNameSplitter,
        trailingSlash,
      }))
    })
}
