const Koa = require('koa')
const Application = require('./application')
const debug = require('debug')('ginkgo:adapter:koa_adapter')

module.exports = class KoaAdapter extends Application {
  constructor () {
    super()
    this.app = new Koa()
  }

  useRoute (router) {
    this.app.use(router.routes())
  }

  use (handler) {
    this.app.use()
  }

  errorHandler (handler) {
    this.app.on('error', (error, ctx) => {
      handler(error, ctx)
    })
  }

  listen (port) {
    debug(`listen port: ${port}`)
    this.app.listen(port)
  }
}