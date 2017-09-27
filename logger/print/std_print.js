const Print = require('./print')

//stream printer
module.exports = class StdPrint extends Print {
  constructor (options = {}) {
    super(options)
    this.stream = options.stream || process.stdout
  }

  write (message) {
    this.stream.write(message)
  }
}