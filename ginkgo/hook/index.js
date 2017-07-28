module.exports = class HookService {
  constructor (options, serviceManager) {
    this.options = options
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new HookService(options, serviceManager)
  }

  init (ginkgo) {
    this.ginkgo = ginkgo
  }

  createHook (handler, ...args) {
    return this.ginkgo.factory.createHook(function (ctx, next) {
      return handler(ctx, next, ...args)
    })
  }
}