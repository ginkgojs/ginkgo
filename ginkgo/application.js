global.Promise = require('bluebird')
const ServiceManager = require('./service_manager')
const KoaApplication = require('./adapter/application/koa_adapter')
const KoaAdapter = require('./adapter/')

module.exports = class Application {
  constructor (options) {
    this.app = new KoaApplication(options)
    this.serviceManager = new ServiceManager(options)
  }

  run () {
    this.directory.init(this.app)
    this.hooks.init(this.app)
    this.logger.init(this.app)
    this.controllers.init(this.app)
    this.middlewares.init(this.app)
    this.validator.init(this.app)
    this.responser.init(this.app)
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

  getApp () {
    return this.app
  }
}