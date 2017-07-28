const debug = require('debug')('ginkgo:responser')

exports.makeHandler = function (serviceManager) {
  const responserService = serviceManager.get('responser')

  return function (ctx, next) {
    debug('responser')
    if (customizeHandler) {
      customizeHandler(ctx, next)
    } else {
      ctx.body = responserService.normalizeNormal(ctx.body)
    }
  }
}

let customizeHandler = null

exports.customize = function (handler) {
  customizeHandler = handler
}