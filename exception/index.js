const Exception = require('./exception')
const HttpException = require('./http_exception')

const DefaultConfigure = {
  errorCode: -1,
  errorMessage: "",
}

module.exports = class ExceptionService {
  constructor (options, serviceManager) {
    this.options = options
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    options = Object.assign(DefaultConfigure, options)
    return new ExceptionService(options, serviceManager)
  }

  init (ginkgo) {
    this.defaultErrorCode = this.options.defaultErrorCode
    this.defaultErrorMessage = this.options.defaultErrorMessage
    this.validateErrorCode = this.options.validateErrorCode || this.options.defaultErrorCode
  }

  createException (code, ...args) {
    let message
    const locale = this.serviceManager.get('locale')

    if (!code) {
      code = this.defaultErrorCode
      message = this.defaultErrorMessage
    } else {
      message = locale.fetch(code)
    }

    return Exception.create(code, args, message)
  }

  createValidateError (error) {
    const args = []
    const status = 200
    const message = error.message
    const code = this.validateErrorCode
    return HttpException.create(status, code, args, message)    
  }

  createHttpException (status, code, ...args) {
    let message
    
    const locale = this.serviceManager.get('locale')    
    if (!code) {
      code = this.options.defaultErrorCode
    } else {
      message = locale.fetch(code)
    }

    return HttpException.create(status, code, args, message)    
  }
}