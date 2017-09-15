const LogLevel = require('../log_level')

module.exports = class Print {
  constructor (options) {
    this.options = options
    this.level = this.options.level || LogLevel.INFO
  }

  write (message) {

  }

  getLevel () {
    return this.level
  }
}