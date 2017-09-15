const Joi = require('joi')
const debug = require('debug')('ginkgo:validator')

module.exports = class ValidatorService {
  constructor (options, serviceManager) {
    this.options = options
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new ValidatorService(options, serviceManager)
  }

  init (ginkgo) {
    this.ginkgo = ginkgo
  }

  execValidate (schema, params) {
    const { error } = Joi.validate(params, schema)
    const exceptionService = this.serviceManager.get('exception')
    if (error) {
      const exception = exceptionService.createValidateError(error)
      return Promise.reject(exception)
    } else {
      return Promise.resolve()
    }
  }

  createValidator (schema) {
    const that = this
    const handler = function (ctx, next) {
      debug('query:', ctx.query) 
      debug('body:', ctx.request.body)
      debug('params:', ctx.request.params)
      const params = Object.assign({}, ctx.request.body, ctx.query, ctx.request.params)
      return that.execValidate(schema, params)
    }

    const hookService = this.serviceManager.get('hook')    
    return hookService.createHook(handler) 
  }
}