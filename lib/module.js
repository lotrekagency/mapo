import { createRoutes } from '@nuxt/utils'
import serveStatic from 'serve-static'
import path from 'path'
import bossaDefaults from './defaults'
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


export default async function BossaModule(moduleOptions) {

    const resolver = new Resolver()

    const userOptions = Object.keys(moduleOptions).length === 0 ? this.options['bossamodule'] : moduleOptions
    const options = _mergeWith(bossaDefaults, userOptions)
    const vuetifyOptions = (this.options && this.options.vuetify) || (userOptions && userOptions.vuetify) || bossaDefaults.vuetify || {}


    this.options.features.store = true
    this.options.store = true
    this.options.components = true


    // inject store ok :P

    this.addPlugin({
        src: path.resolve(__dirname, './templates/store/index.js'),
        options: options,
        fileName: path.join('bossamodule', 'plugins.store.index.js')
    })


    // inject all pages ok :P
    const pages = (await resolver.resolveRelative(__dirname, 'templates/pages')).map(({ src }) => `pages/${src}`)
    const { routeNameSplitter, trailingSlash } = this.options.router
    this.extendRoutes((routes) => {
        routes.push(...createRoutes({
            files: pages,
            srcDir: path.resolve(__dirname, 'templates'),
            pagesDir: 'pages',
            routeNameSplitter,
            trailingSlash,
        }).filter(route => !routes.some(approute => approute.path === route.path)))
    })

    // inject all layouts ok :P
    const layouts = (await resolver.resolveRelative(__dirname, 'templates/layouts')).map(({ src }) => src)

    for (const layout of layouts) {
        this.addLayout({
            src: path.resolve(__dirname, './templates/layouts', layout),
            fileName: layout.replace(new RegExp('\\.(js)$'), '')
        })
    }

    // inject all middlewares ok :P
    const middlewares = (await resolver.resolveRelative(__dirname, 'templates/middleware')).map(({ src }) => src)

    for (const middleware of middlewares) {
        this.addPlugin({
            src: path.resolve(__dirname, './templates/middleware', middleware),
            fileName: path.join('bossamodule', middleware)
        })
    }

    // module injection ok :P
    this.requireModule(['@nuxtjs/vuetify', vuetifyOptions])
    this.requireModule([path.resolve(__dirname, './templates/modules/meta-injection.js')])

    // static injection ok :P
    this.addServerMiddleware(
        serveStatic(path.resolve(__dirname, 'templates', 'static')),
    )
    // component injection ok :P
    this.nuxt.hook('components:dirs', (dirs) => {
        dirs.unshift({ path: path.resolve(__dirname, 'templates', 'components') })
    })
    this.nuxt.hook('components:extend', (components) => {
        const noDupes = Object.values(components.reduce((map, comp) => ({ ...map, [comp.pascalName]: comp }), {}))
        components.length = 0
        components.push(...noDupes)
    })

    // build alias injection ok :P
    this.extendBuild((config) => {
        config.resolve.alias['~bossamodule'] = path.resolve(__dirname, './templates')
    })
}

module.exports.meta = require('../package.json')

