import { createRoutes } from '@nuxt/utils'
import serveStatic from 'serve-static'
import path from 'path'
import Glob from 'glob'
import pify from 'pify'
const glob = pify(Glob)

class Resolver {
    resolveFiles = async (cwd, dir) => await glob(`${dir}/**/*.{vue,js}`, { cwd })
    resolveRelative = async (cwd, dir) => {
        const dirPrefix = new RegExp(`^${dir}/`)
        return (await this.resolveFiles(cwd, dir)).map(file => ({ src: file.replace(dirPrefix, '') }))
    }
}

export default async function (moduleOptions) {

    const resolver = new Resolver()
    const userModuleOptions = Object.keys(moduleOptions).length === 0 ? (this.options['mapo'] || {}) : moduleOptions

    // INJECT VUETIFY MODULE
    this.requireModule(['@nuxtjs/vuetify', (this.options && this.options.vuetify) || userModuleOptions.vuetify || {}]);
    
    // INJECT I18N MODULE
    this.requireModule(['@nuxtjs/i18n', (this.options && this.options.i18n) || userModuleOptions.i18n || {},]);

    // INJECT ALL LAYOUTS
    const layouts = (await resolver.resolveRelative(__dirname, 'layouts')).map(({ src }) => src)

    for (const layout of layouts) {
        this.addLayout({
            src: path.resolve(__dirname, './layouts', layout),
            fileName: layout.replace(new RegExp('\\.(js)$'), '')
        })
    }

    // INJECT STATICS
    this.addServerMiddleware(
        serveStatic(path.resolve(__dirname, 'static')),
    )

    // INJECT COMPONENTS
    this.nuxt.hook('components:dirs', (dirs) => {
        const mapoComponents = ['components', 'components/Form/fields', 'components/layout']
        mapoComponents.forEach(d => dirs.unshift({ path: path.resolve(__dirname, d)}))
    })
    this.nuxt.hook('components:extend', (components) => {
        const clearName = (name) => name.replace(/^Mapoverride/, '').replace(/^mapoverride-/, '')
        const componentsOverride = Object.values(components.reduce((map, comp) => (
            { ...map, [clearName(comp.pascalName)]: {...comp, pascalName:clearName(comp.pascalName), kebabName:clearName(comp.kebabName)} }
        ), {}))
        components.length = 0
        components.push(...componentsOverride)
    })

    // INJECT ALL PAGES
    const pages = (await resolver.resolveRelative(__dirname, 'pages')).map(({ src }) => `pages/${src}`)
    const { routeNameSplitter, trailingSlash } = this.options.router
    const disabled = userModuleOptions['disabledRoutes'] && (Array.isArray(userModuleOptions['disabledRoutes']) ? userModuleOptions['disabledRoutes'] : userModuleOptions['disabledRoutes'].split(" ")) || []
    this.extendRoutes((routes) => {
        routes.push(...createRoutes({
            files: pages,
            srcDir: path.resolve(__dirname),
            pagesDir: 'pages',
            routeNameSplitter,
            trailingSlash,
        }).filter(route => !disabled.includes(route.name) && !routes.some(approute => approute.path === route.path)))
    })

    // INJECT WEBPACK DUMMY-LOADER FOR DOCS TAG
    this.extendBuild((config) => {
        config.module.rules.push({
            resourceQuery: /blockType=docs/,
            loader: require.resolve(path.resolve(__dirname, '../utils/loaders/dummy-loader.js'))
        })
    })

}

module.exports.meta = require('./package.json')
