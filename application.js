global.Promise = require('bluebird')
const ServiceFactory = require('./service_factory')
const KoaFactory = require('./adapter/koa_factory')

module.exports = class Application {
  constructor (options) {
    global.ginkgo = this    
    this.adapterFactory = new KoaFactory(options)
    this.application = this.adapterFactory.createApplication(options)
    this.ServiceFactory = new ServiceFactory(options)
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

  get env () {
    return process.NODE_ENV || "development"
  }

  get factory () {
    return this.adapterFactory
  }

  get middlewares () {
    return this.ServiceFactory.get('middlewares')
  }

  get logger () {
    return this.ServiceFactory.get('logger')
  }

  get configure () {
    return this.ServiceFactory.get('configure')
  }

  get controllers () {
    return this.ServiceFactory.get('controller')
  }

  get hooks () {
    return this.ServiceFactory.get('hook')
  }

  get validator () {
    return this.ServiceFactory.get('validator')
  }

  get responser () {
    return this.ServiceFactory.get('responser')
  }

  get directory () {
    return this.ServiceFactory.get('directory')
  }

  get services () {
    return this.ServiceFactory
  }

  get app () {
    return this.application
  }
}