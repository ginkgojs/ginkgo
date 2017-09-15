const fs = require('fs')
const path = require('path')
const Print = require('./print')

//file printer
module.exports = class FilePrint extends Print {
  constructor (options) {
    super(options)
    this.init()
  }

  init () {
    this.path = this.options.path
    const fileDirectory = path.dirname(this.path)
    fs.existsSync(fileDirectory) || fs.mkdirSync(fileDirectory)
  }

  write (message, options) {
    fs.writeFileSync(this.path, message, options)
  }
}