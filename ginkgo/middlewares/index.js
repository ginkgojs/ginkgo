const responser = require('./responser')
const errorHandler = require('./error_handler')

//middlewares模块在加载controller的时候，自动加载router，handler
//提供三个内置middlewares: not_found / error_handler / responser
module.exports = class MiddlewareService {
  constructor (options, serviceManager) {
    this.options = options
    this.serviceManager = serviceManager
    this.routes = {
      "before": [],
      "after": []
    }
  }

  static create (options, serviceManager) {
    return new MiddlewareService(options, serviceManager)
  }

  init (ginkgo) {
    this.ginkgo = ginkgo
    this.app = ginkgo.app
    this.app.use(this.app.createMiddleware(responser.makeHandler(this.serviceManager)))
    this.app.createErrorHandler(errorHandler.makeHandler(this.serviceManager))
  }

  loadBeforeRouterHandler (handler) {
    return this.routes.before
  }

  loadAfterRouterHandler () {
    return this.routes.after    
  }

  setRouterHandler (type, handler) {
    switch (type) {
      case 'before': {
        this.routes.before.push(handler)        
        break
      }
      case 'after': {
        this.routes.after.push(handler)
        break
      }
      default: {
        throw new Error("Unknow Router Handler type:" + type)
      }
    }
  }

  setAuthorizeHandler (handler) {
    this.setRouterHandler('before', handler)
  }

  setupErrorHandler (handler) {
    errorHandler.customize(handler)
  }

  setupResponseHandler (handler) {
    responser.customize(handler)
  }
}