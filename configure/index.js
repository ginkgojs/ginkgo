const fs = require('fs')
const path = require('path')
const ConfigWrapper = require('./config')
const debug = require('debug')('ginkgo:configure:index')

module.exports = class ConfigureService {
  constructor (options, serviceManager) {
    this.options = options
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new ConfigureService(options, serviceManager)
  }

  init (app) {
    const env = app.env
    const dirService = this.serviceManager.get('directory')
    this.configRoot = dirService.CONFIG_ROOT || this.options.configRoot
    if (!fs.existsSync(this.configRoot)) {
      throw new Error("Configure Root Path not exists")
    } else {
      this.configure = this.loadConfig(env)      
    }
  }

  loadConfig (env) {
    const defaultConfig = this.loadConfigFile('default.json')
    const envConfig = this.loadConfigFile(`${env}.json`)
    return this.wrapConfig(defaultConfig, envConfig)
  }

  loadConfigFile (fileName) {
    debug('loadConfigFile: ', fileName)
    const data = fs.readFileSync(path.join(this.configRoot, fileName), { encoding: 'utf8' })
    return JSON.parse(data)
  }

  wrapConfig (...args) {
    const config = Object.assign(...args)
    return ConfigWrapper(config, this.options)
  }

  get (...args) {
    return this.configure.get(...args)
  }

  has (...args) {
    return this.configure.has(...args)    
  }
}