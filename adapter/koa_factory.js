const AdapterFactory = require('./adapter_factory')
const KoaRouter = require('./router/koa_router')
const KoaApplication = require('./application/koa_application')
const debug = require('debug')('ginkgo:adapter:koa_factory')

module.exports = class KoaAdapter extends AdapterFactory {
  constructor (options) {
    super()
  }

  createHook (handler) {
    return function (ctx, next) {
      return handler(ctx, next)
    }
  }

  createApplication (options) {
    debug('createApplication', options)
    return new KoaApplication(options)
  }

  createRouter (options) {
    debug('createRouter', options)    
    return new KoaRouter(options)
  }
}