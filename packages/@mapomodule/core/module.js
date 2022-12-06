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

    const namespace = 'mapo'

    // INJECT MAPO PLUGIN
    this.addPlugin({
        src: path.resolve(__dirname, './index.js'),
        fileName: path.join(namespace, 'mapo.js')
    })

    // INJECT ALL MIDDLEWARES
    const middlewares = (await resolver.resolveRelative(__dirname, 'middleware')).map(({ src }) => src)

    for (const middleware of middlewares) {
        this.addPlugin({
            src: path.resolve(__dirname, './middleware', middleware),
            fileName: path.join(namespace, 'middleware', middleware)
        })
    }

    this.addTemplate({
        src: path.resolve(__dirname, './templates/options.js'),
        fileName: path.join(namespace, 'options.js'),
        options: moduleOptions
    })
    
}

module.exports.meta = require('./package.json')
