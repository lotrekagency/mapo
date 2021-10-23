import * as babel from '@babel/core'
import traverse from '@babel/traverse'
import { readFileSync } from 'fs-extra'
import { join } from 'path'
import chokidar from 'chokidar'

function checkRouteChange(file, localRoutes, properties) {
    const routes = localRoutes.filter(route => route.component === file)

    if (!routes.length) {
        return false
    }

    const extras = extractProperies(routes[0].component, properties)

    return JSON.stringify(routes[0].meta) !== JSON.stringify(extras)
}

const recursiveMap = (node) => {
    switch (node.type) {
        case 'ObjectProperty':
            return { [node.key.name]: recursiveMap(node.value) }
        case 'ObjectExpression':
            return Object.assign({}, ...node.properties.map(pnode => recursiveMap(pnode)))
        case 'ArrayExpression':
            return [...node.elements.map(enode => recursiveMap(enode))]
        default:
            return node.value
    }
}

const extractProperies = (filename, options) => {
    const vueTemplateCompiler = require('vue-template-compiler')
    const Component = vueTemplateCompiler.parseComponent(readFileSync(filename, 'utf8'))
    let data = {}
    if (Component.script && Component.script.content) {
        const ast = babel.parseSync(Component.script.content, { filename })
        traverse(ast, {
            ExportDefaultDeclaration: path => {
                data = Object.assign(
                    {},
                    ...path.node.declaration.properties.filter(
                        p => options.includes(p.key.name)).map(e => recursiveMap(e))
                )
            }
        })
    }
    return data.meta && Object.keys(data).length === 1 ? data.meta : data
}

export default function (moduleOptions) {
    const options = {
        additionalProperties: [],
        ...this.options.routeMeta,
        ...moduleOptions,
    }
    const properties = ['meta', ...options.additionalProperties]

    let localRoutes = []
    let filesWatcher

    this.extendRoutes(routes => {
        routes.forEach(route => route.meta = extractProperies(route.component, properties))
        localRoutes = routes
    })

    this.nuxt.hook('build:done', (builder) => {
        if (this.options.dev) {
            const path = join(this.options.srcDir, this.options.dir.pages)
            filesWatcher = chokidar.watch(path, { ignoreInitial: true })
            filesWatcher.on('change', (file) => {
                if (checkRouteChange(file, localRoutes, properties)) {
                    builder.generateRoutesAndFiles()
                }
            })
        }
    })

    this.nuxt.hook('close', () => {
        if (filesWatcher) {
            filesWatcher.close()
            filesWatcher = null
        }
    })

}