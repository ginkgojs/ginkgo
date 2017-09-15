module.exports = class {
  constructor () {

  }

  useRoute (route) {

  }

  use (handler) {

  }

  errorHandler () {

  }

  listen (port) {

  }

  createMiddleware (handler) {
    return function (ctx, next) {
      return handler(ctx, next)
    }
  }
}