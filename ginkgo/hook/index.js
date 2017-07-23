module.exports = class HookService {
  constructor (options, serviceManager) {
    this.options = options
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new HookService(options, serviceManager)
  }

  init () {

  }

  createHook (handler, ...args) {
    return function (ctx, next) {
      return handler(ctx, next, ...args)
    }
  }
}