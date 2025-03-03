import path from 'path'
import fs from 'fs'


export default async function (moduleOptions) {


    const namespace = 'mapo'

    // INJECT STORE
    this.addPlugin({
        src: path.resolve(__dirname, './index.js'),
        fileName: path.join(namespace, 'store', 'index.js')
    })

    const foldersToSync = ['modules']
    for (const pathString of foldersToSync) {
        const filePath = path.resolve(__dirname, pathString)
        for (const file of fs.readdirSync(filePath)) {
            this.addTemplate({
                src: path.resolve(filePath, file),
                fileName: path.join(namespace, 'store', pathString, file),
            })
        }
    }
    
}

module.exports.meta = require('./package.json')
