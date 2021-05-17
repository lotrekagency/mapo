import { createRoutes } from '@nuxt/utils'
import serveStatic from 'serve-static'
import path from 'path'
import mapoDefaults from './defaults'
const _mergeWith = require('lodash.mergewith')
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

function customMerger(objValue, srcValue, key) {
    const isFunction = function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }
    if (key == 'extendPlugins' && isFunction(objValue) && isFunction(srcValue)) {
        return plugins => objValue(srcValue(plugins))
    }
    if (typeof objValue !== 'object'){
        return objValue
    }
}

export default async function MapoModule(moduleOptions) {

    const resolver = new Resolver()

    const userModuleOptions = Object.keys(moduleOptions).length === 0 ? (this.options['mapomodule'] || {}) : moduleOptions

    this.options = _mergeWith(this.options, mapoDefaults, customMerger)

      //////////////////////////
     // Start INJECTING CODE //
    //////////////////////////


    // INJECT VUETIFY MODULE
    this.requireModule(['@nuxtjs/vuetify', (this.options && this.options.vuetify) || userModuleOptions.vuetify || mapoDefaults.vuetify || {}])

    // INJECT AXIOS MODULE
    this.requireModule(['@nuxtjs/axios', (this.options && this.options.axios) || userModuleOptions.axios || mapoDefaults.axios || {}])

    // INJECT MAPO PLUGIN
    this.addPlugin({
        src: path.resolve(__dirname, './templates/plugins/mapo.plugin.js'),
        fileName: path.join('mapomodule', 'plugins.mapo.js')
    })

    // INJECT STORE
    this.addPlugin({
        src: path.resolve(__dirname, './templates/store/index.js'),
        fileName: path.join('mapomodule', 'plugins.store.index.js')
    })

    // INJECT ALL PAGES
    const pages = (await resolver.resolveRelative(__dirname, 'templates/pages')).map(({ src }) => `pages/${src}`)
    const { routeNameSplitter, trailingSlash } = this.options.router
    const disabled = userModuleOptions['disabledRoutes'] && (Array.isArray(userModuleOptions['disabledRoutes']) ? userModuleOptions['disabledRoutes'] : userModuleOptions['disabledRoutes'].split(" ")) || []
    this.extendRoutes((routes) => {
        routes.push(...createRoutes({
            files: pages,
            srcDir: path.resolve(__dirname, 'templates'),
            pagesDir: 'pages',
            routeNameSplitter,
            trailingSlash,
        }).filter(route => !disabled.includes(route.name) && !routes.some(approute => approute.path === route.path)))
    })

    // INJECT ALL LAYOUTS
    const layouts = (await resolver.resolveRelative(__dirname, 'templates/layouts')).map(({ src }) => src)

    for (const layout of layouts) {
        this.addLayout({
            src: path.resolve(__dirname, './templates/layouts', layout),
            fileName: layout.replace(new RegExp('\\.(js)$'), '')
        })
    }

    // INJECT ALL MIDDLEWARES
    const middlewares = (await resolver.resolveRelative(__dirname, 'templates/middleware')).map(({ src }) => src)

    for (const middleware of middlewares) {
        this.addPlugin({
            src: path.resolve(__dirname, './templates/middleware', middleware),
            fileName: path.join('mapomodule', `plugins.middleware.${middleware}`)
        })
    }

    // INJECT STATICS
    this.addServerMiddleware(
        serveStatic(path.resolve(__dirname, 'templates', 'static')),
    )

    // INJECT COMPONENTS
    this.nuxt.hook('components:dirs', (dirs) => {
        const mapoComponents = ['components', 'components/fields', 'components/layout']
        mapoComponents.forEach(d => dirs.unshift({ path: path.resolve(__dirname, 'templates', d)}))
    })
    this.nuxt.hook('components:extend', (components) => {
        const noDupes = Object.values(components.reduce((map, comp) => ({ ...map, [comp.pascalName]: comp }), {}))
        components.length = 0
        components.push(...noDupes)
    })

    // INJECT META MODULE (this need to run after pages injection to get meta also for mapo pages)
    this.requireModule([path.resolve(__dirname, './templates/modules/routemeta.js')])

    // INJECT WEBPACK BUILD ALIAS
    this.extendBuild((config) => {
        config.resolve.alias['~mapomodule'] = path.resolve(__dirname, './templates')
    })
}

module.exports.meta = require('../package.json')
