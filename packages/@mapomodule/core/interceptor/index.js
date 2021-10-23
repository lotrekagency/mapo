const AuthInterceptor = require('./auth')

module.exports = (ctx) => {
    AuthInterceptor(ctx)
}