module.exports = class ResponserService {
  constructor (options, serviceManager) {
    this.options = options
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new ResponserService(options, serviceManager)
  }

  init () {
    
  }
}