const debug = require('debug')('ginkgo:error_handler')

exports.makeHandler = function (serviceManager) {
  const responserService = serviceManager.get('responser')

  return function (err, ctx) {
    debug('catch error', err)
    if (customizeHandler) {
      customizeHandler(err, ctx)
    } else if (!ctx.headerSent) {
      //TODO
      //  const result = responserService.normalizeError(err)
      //  debug(result)
      //  ctx.status = result.status
      console.log('hahah')
      ctx.status = 200
       ctx.body = "Hello World"
      //  console.dir(ctx.body) 
    } else {
      debug('Error Handler', err)
    }
  }
}

let customizeHandler = null

exports.customize = function (handler) {
  customizeHandler = handler
}