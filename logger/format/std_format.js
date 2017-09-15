const util = require('util')
const Format = require('./format')
const LogLevel = require('../log_level')

module.exports = class StdFormat extends Format {
  constructor (options) {
    super(options)
  }

  format (level, str, ...args) {
    const f = LogLevel.LEVEL_FORMATER[level]
    return util.format(f + str, ...agrs)
  }
}