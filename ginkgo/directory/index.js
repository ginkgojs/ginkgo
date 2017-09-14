const fs = require('fs')
const path = require('path')
const debug = require('debug')('ginkgo:startup:directory')

module.exports = class DirectoryService {
  constructor (options, serviceManager) {
    // debug(options)
    this.serviceManager = serviceManager
    this.directorys = Object.create(null)
    this.directorys.APP_ROOT = options.APP_ROOT
    this.directorys.LOG_ROOT = path.resolve(options.APP_ROOT, 'logs')
    this.directorys.HOOK_ROOT = path.resolve(options.APP_ROOT, 'hooks')
    this.directorys.SERVICE_ROOT = path.resolve(options.APP_ROOT, 'services')
    this.directorys.CONTROLLER_ROOT = path.resolve(options.APP_ROOT, 'controllers')
    debug(this.directorys)
    this.ensureDirectory('LOG_ROOT')
  }

  static create (options, serviceManager) {
    return new DirectoryService(options, serviceManager)
  }

  init () {

  }

  checkDirectoryExists (dir) {
    if (!fs.existsSync(dir)) {
      throw new Error('Directory Not Exists: ' + dir)
    }
    if (!fs.statSync(dir).isDirectory()) {
      throw new Error('Not a Directory ' + dir)
    }
  }

  ensureDirectory (name) {
    const directory = this.getDirectory(name)
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
    }
  }

  get HOOK_ROOT () {
    return this.getDirectory("HOOK_ROOT")
  }

  get MODEL_ROOT () {
    return this.getDirectory('MODEL_ROOT')
  }

  get LOG_ROOT () {
    return this.getDirectory('LOG_ROOT')
  }

  get SERVICE_ROOT () {
    return this.getDirectory('SERVICE_ROOT')
  }

  get CONTROLLER_ROOT () {
    return this.getDirectory('CONTROLLER_ROOT')
  }

  getDirectory (name) {
    return this.directorys[name]
  }
}