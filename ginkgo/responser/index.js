const debug = require('debug')('ginkgo:responser')

module.exports = class ResponserService {
  constructor (options, serviceManager) {
    this.options = options
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new ResponserService(options, serviceManager)
  }

  init (ginkgo) {
    this.ginkgo = ginkgo
  }

  normalizeNormal (result) {
    debug('normalizeNormal', result)
  }

  normalizeError (err) {
    const data = {}    
    const status = err.status || 500
    
    data.code = err.code || -1
    data.message = err.format ? err.format() : err.message

    return { status, data }
  }
}