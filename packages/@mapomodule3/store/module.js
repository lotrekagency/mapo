import path from 'path'
import fs from 'fs'
import { addPlugin } from '@nuxt/kit'

export default async function (moduleOptions) {
    const namespace = 'mapo'
    console.log('new store');

    // INJECT STORE
    addPlugin(path.resolve(__dirname, `./index.js`))

    const foldersToSync = ['modules']
    for (const pathString of foldersToSync) {
        const filePath = path.resolve(__dirname, pathString)
        for (const file of fs.readdirSync(filePath)) {
            addPlugin(path.resolve(__dirname, `${filePath}/${file}`))
        }
    }

}

module.exports.meta = require('./package.json')
