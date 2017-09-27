const debug = require('debug')('logger')
const LogLevel = require('./log_level')
const printCreator = require('./print')
const formatCreator = require('./format')

const DefaultFormats = ['std', 'error']
const DefaultPrints = [{ stream: process.stdout }]

module.exports = class Logger {
  constructor (options, serviceManager) {
    this.options = options
    this.prints = options.prints || DefaultPrints
    this.formats = options.formats || DefaultFormats
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new Logger(options, serviceManager)
  }

  init () {
    this.createPrinter()
    this.createFormater()
  }

  createPrinter () {
    this.prints = this.prints.map(it => {
      if (it.stream) {
        return printCreator('std', it)
      } else if (it.path) {
        return printCreator('file', it)        
      } else {
        throw new Error("Unknow Print: " + it)
      }
    })
  }

  createFormater () {
    this.formats = this.formats.reduce((acc, type) => {
      acc[type] = formatCreator(type)
      return acc
    }, {})
  }

  write (level, str, ...args) {
    const formater = this.getFormater(str)
    const message = formater.format(level, str, ...args)
    this.prints.forEach(printer => {
      if (level > printer.getLevel()) {
        printer.write(message)
      }
    })
  }

  getFormater (arg) {
    return Object.keys(this.formats)
      .find(type => {
      const formater = this.formats[type]
      return formater.match(arg)
    })
  }

  info (...args) {
    args.unshift(LogLevel.INFO)
    return this.write(...args)
  }

  debug (...args) {
    args.unshift(LogLevel.DEBUG)
    return this.write(...args)
  }

  trace (...args) {
    args.unshift(LogLevel.TRACE) 
    return this.write(...args)
  }

  error (...args) {
    args.unshift(LogLevel.ERROR)   
    return this.write(...args)
  }

  fatal (...args) {
    args.unshift(LogLevel.FATAL)    
    return this.write(...args)
  }
}