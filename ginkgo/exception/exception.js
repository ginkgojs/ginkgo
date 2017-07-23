const util = require('util')

module.exports = class Exception {
  constructor (code, args, message) {
    this.code = code
    this.args = args
    this.message = message
  }

  static create (code, args, message) {
    return new Exception(code, args, message)
  }

  format () {
    return util.format(this.message, ...this.args)
  }
}