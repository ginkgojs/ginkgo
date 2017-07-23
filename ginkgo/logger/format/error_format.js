const util = require('util')
const Format = require('./format')

module.exports = class ErrorFormat extends Format {
  constructor (options) {
    super(options)
  }

  format (err) {
    return util.format(`error code: ${err.code}, message: ${err.message}`)
  }
}