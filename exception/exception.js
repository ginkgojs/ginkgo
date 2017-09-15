const util = require('util')

//TODO
module.exports = class Exception extends Error {
  constructor (code, args, message) {
    super()
    this.headerSent = true
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