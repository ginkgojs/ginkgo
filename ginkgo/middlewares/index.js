const responser = require('./responser')
const errorHandler = require('./error_handler')

module.exports = class MiddlewareService {
  constructor (options, serviceManager) {
    this.options = options    
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new MiddlewareService(options, serviceManager)
  }

  init (ginkgo) {
    // const 
    // app.use()
  }

  setupErrorHandler (handler) {
    errorHandler.customize(handler)
  }

  setupResponseHandler (handler) {
    responser.customize(handler)
  }
}