const fs = require('fs');

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
    const directoryService = this.serviceManager.get('directory')
    this.directory = directoryService.MIDDLEWARES_ROOT    
    this.loadMiddlewares(this.directory)
  }

  loadMiddlewares (directory) {
    if (!fs.existsSync(directory)) {
      throw new Error("middlewares directory not found")
    }
    const middlewares = require(directory)
    Object.keys(middlewares).forEach(type => {
      middlewares[type].forEach(middleware => {
        this.addRouterHandler(type, middleware)
      })
    })
  }

  loadBeforeRouterHandler (handler) {
    return this.routes.before
  }

  loadAfterRouterHandler () {
    return this.routes.after    
  }

  addRouterHandler (type, handler) {
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
    this.addRouterHandler('before', handler)
  }
}