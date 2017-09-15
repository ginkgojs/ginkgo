const statuses = require('statuses')
const Exception = require('./exception')

module.exports = class HttpException extends Exception {
  constructor (status, code, args, message) {
    super(code, args, message)
    this.status = status
  }

  static create (status, code, args, message) {
    status = status || 500
    if (message === undefined) {
      message = statuses[status]
    }

    return new HttpException(status, code, args, message)
  }

  getStatus () {
    return this.status
  }

  setStatus (status) {
    this.status = status
    this.message = httpStatus[status]
    return this
  }
}