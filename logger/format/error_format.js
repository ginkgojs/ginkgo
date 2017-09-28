const util = require('util')
const Format = require('./format')
const LogLevel = require('../log_level')

module.exports = class ErrorFormat extends Format {
  constructor (options) {
    super(options)
  }

  format (level, err) {
    const f = LogLevel.LEVEL_FORMATER[level]    
    return util.format(`${f} error code: ${err.code}, message: ${err.message}`)
  }

  match (arg) {
    return arg && arg instanceof Error
  }
}