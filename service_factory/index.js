const debug = require('debug')('ginkgo:service_manager')
const ServiceFactory = require('./factory')

module.exports = class ServiceManager {
  constructor (options) {
    this.serviceMapping = Object.create(null)
    ServiceFactory.create(options, this)
  }

  get (name) {
    return this.serviceMapping[name]
  }

  set (name, service) {
    this.serviceMapping[name] = service
  }
}