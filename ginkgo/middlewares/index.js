//middlewares模块在加载controller的时候，自动加载router，handler
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
}