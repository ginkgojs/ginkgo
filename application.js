global.Promise = require('bluebird')
const ServiceManager = require('./service_manager')
const KoaFactory = require('./adapter/koa_factory')

module.exports = class Application {
  constructor (options) {
    global.ginkgo = this    
    this.adapterFactory = new KoaFactory(options)
    this.application = this.adapterFactory.createApplication(options)
    this.serviceManager = new ServiceManager(options)
  }

  run (port) {
    this.directory.init(this)
    this.hooks.init(this)
    this.logger.init(this)
    this.controllers.init(this)
    this.middlewares.init(this)
    this.validator.init(this)
    this.responser.init(this)

    return this.app.listen(port)
  }

  get factory () {
    return this.adapterFactory
  }

  get middlewares () {
    return this.serviceManager.get('middlewares')
  }

  get logger () {
    return this.serviceManager.get('logger')
  }

  get controllers () {
    return this.serviceManager.get('controller')
  }

  get hooks () {
    return this.serviceManager.get('hook')
  }

  get validator () {
    return this.serviceManager.get('validator')
  }

  get responser () {
    return this.serviceManager.get('responser')
  }

  get directory () {
    return this.serviceManager.get('directory')
  }

  get services () {
    return this.serviceManager
  }

  get app () {
    return this.application
  }
}