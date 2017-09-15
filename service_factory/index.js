const Hook = require('../hook')
const Locale = require('../locale')
const Logger = require('../logger')
const Exception = require('../exception')
const Directory = require('../directory')
const Controller = require('../controller')
const Validator = require('../validator')
const Responser = require('../responser')
const Middlewares = require('../middlewares')

module.exports = class ServiceFactory {
  constructor (options) {
    this.options = options
  }

  static create (options, serviceManager) {
    const instance = new ServiceFactory(options)

    const logger = instance.createLogger(serviceManager)
    serviceManager.set('logger', logger)
    const exception = instance.createException(serviceManager)
    serviceManager.set('exception', exception)
    const locale = instance.createLocale(serviceManager)
    serviceManager.set('locale', locale)
    const directory = instance.createDirectory(serviceManager)
    serviceManager.set('directory', directory)
    const constroller = instance.createController(serviceManager)
    serviceManager.set('controller', constroller)
    const hook = instance.createHook(serviceManager)
    serviceManager.set('hook', hook)
    const validator = instance.createValidator(serviceManager)
    serviceManager.set('validator', validator)
    const responser = instance.createResponser(serviceManager)
    serviceManager.set('responser', responser)
    
    const middlewares = instance.createMiddlewares(serviceManager)
    serviceManager.set('middlewares', middlewares)

    return
  }

  createLogger (serviceManager) {
    const options = this.options.logger || {}
    return Logger.create(options, serviceManager)
  }

  createResponser (serviceManager) {
    const options = this.options.responser || {}
    return Responser.create(options, serviceManager)
  }

  createMiddlewares (serviceManager) {
    const options = this.options.middlewares || {}
    return Middlewares.create(options, serviceManager)
  }

  createValidator (serviceManager) {
    const options = this.options.validator || {}
    return Validator.create(options, serviceManager)
  }

  createHook (serviceManager) {
    const options = this.options.hook || {}
    return Hook.create(options, serviceManager)
  }

  createController (serviceManager) {
    const options = this.options.constroller || {}
    return Controller.create(options, serviceManager)
  }

  createDirectory (serviceManager) {
    const options = this.options.directory || {}
    return Directory.create(options, serviceManager)
  }

  createLocale (serviceManager) {
    const options = this.options.locale || {}
    return Locale.create(options, serviceManager)
  }

  createException (serviceManager) {
    const options = this.options.exception || {}
    return Exception.create(options, serviceManager)
  }
}