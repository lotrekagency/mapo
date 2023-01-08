
const setupEndpoint = (src, options) => {
    try {
        return require(src)(options)
    }
    catch (e) {
        console.error(`Cannot correctly resolve ${src}\nMake sure to export the main function in your file.`)
        console.error(e)
        return ""
    }
}

module.exports = {
    setupEndpoint
}