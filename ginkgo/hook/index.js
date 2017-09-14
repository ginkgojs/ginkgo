const fs = require('fs')
const path = require('path')
const debug = require('debug')('ginkgo:hook')

module.exports = class HookService {
  constructor (options, serviceManager) {
    this.options = options
    this.hookMapping = Object.create(null)
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new HookService(options, serviceManager)
  }

  init (ginkgo) {
    this.ginkgo = ginkgo
    const directoryService = this.serviceManager.get('directory')
    this.directory = directoryService.HOOK_ROOT
    debug('common hook directory:', this.directory)
    this.loadHooks(this.directory)
  }

  errorHanlder (ctx, next, err) {
    const responserService = this.serviceManager.get('responser')
    const { status, data } = responserService.normalizeError(err)
    debug(err)
    if (!ctx.headerSent) {
      ctx.body = data
      ctx.status = status
    }
  }

  responseHandler (ctx, next, result) {
    const responserService = this.serviceManager.get('responser')
    const { status, data } = responserService.normalizeNormal(result)
    ctx.body = data
    ctx.status = status    
  }

  loadHooks (directory) {
    fs.readdirSync(directory).forEach(file => {
      const filePath = path.join(directory, file)
      if (!fs.statSync(filePath).isFile()) {
        debug("loadHooks warn: need file " + filePath)
      } else {
        this.loadHookFile(filePath)
      }
    })
  }

  loadHookFile (filePath) {
    const module = require(filePath)
    const props = Object.keys(module)
    props.forEach(prop => {
      if (typeof module[prop] === 'function') {
        this.hookMapping[prop] = module[prop]
        debug('register hook: ', prop)
      }
    })
  }

  getHook (name) {
    if (this.hookMapping[name]) {
      return this.hookMapping[name]
    } else {
      throw new Error("Not Found Hook:" + name)
    }
  }

  createHook (handler, ...args) {
    return this.ginkgo.factory.createHook(function (ctx, next) {
      return handler(ctx, next, ...args)
    })
  }
}