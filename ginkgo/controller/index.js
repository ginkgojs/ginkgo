const fs = require('fs')
const path = require('path')
const debug = require('debug')('ginkgo:controller')

module.exports = class ControllerService {
  constructor (options, serviceManager) {
    this.options = options
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    return new ControllerService(options, serviceManager)
  }

  init (ginkgo) {
    this.ginkgo = ginkgo
    const directoryService = this.serviceManager.get('directory')
    this.directory = directoryService.CONTROLLER_ROOT
    this.loadControllers(this.directory)
  }

  loadControllers (directory) {
    fs.readdirSync(directory).forEach(it => {
      const filePath = path.join(directory, it)
      if (fs.statSync(filePath).isDirectory()) {
        this.ginkgo.app.useRoute(this.loadRoutes(filePath))
      } else {
        throw new Error("Invalid Controller directory:" + filePath)
      }
    })
  }

  loadRoutes (filePath) {
    const version = path.basename(filePath)
    const routePrefix = (this.options.basePath || '/') + version
    const route = this.ginkgo.factory.createRouter({ prefix: routePrefix })

    const middlewareService = this.serviceManager.get('middlewares')
    const beforeHandlers = middlewareService.loadBeforeRouterHandler()
    const afterHandlers = middlewareService.loadAfterRouterHandler()

    if (beforeHandlers.length) {
      route.use(...beforeHandlers)
    }

    fs.readdirSync(filePath).forEach(it => {
      const subPath = path.join(filePath, it)
      this.loadRouteHandler(route, subPath)
    })

    if (afterHandlers.length) {
      route.use(...afterHandlers)
    }

    return route
  }

  loadRouteHandler (route, filePath) {
    const routeDefinitions = this.loadRouteDefinitions(filePath)

    debug(`loadRouteHandler: ${filePath}`)
    routeDefinitions.forEach(it => {
      debug(it)
      const method = it.method.toLowerCase()
      const name = it.name || it.handler.name
      debug(`register handler: ${method} ${name}`)
      if (typeof it.handler !== 'function') {
        throw('router handler not an function')
      }
      route[method](it.url, this.makeHandler(name, it, filePath))
    })
  }

  loadRouteDefinitions (basePath) {
    const routePath = path.join(basePath, 'router.js')

    if (!fs.existsSync(routePath)) {
      throw new Error('not found router file: ' + routePath)
    }
    else {
      return require(routePath)
    }
  }

  makeHandler (name, definition, filePath) {
    const validator = this.makeValidator(name, filePath)
    const beforeHooks = this.makeBeforeHooks(name, filePath)
    const afterHooks = this.makeAfterHooks(name, filePath)

    function handler (...args) {
      debug('invoke validator')      
      return validator(...args)
        .then(() => {
          debug('invoke beforeHooks')
          return beforeHooks(...args)
        })
        .then(() => {
          debug('invoke handler')          
          return definition.handler(...args)          
        })
        .then(() => {
          debug('invoke afterHooks')         
          return afterHooks(...args)
        })
    }

    return handler.bind(this.app)
  }

  makeValidator (name, filePath) {
    const definition = this.loadValidatorDefinition(name, filePath)
    const validatorService = this.serviceManager.get('validator')      

    return validatorService.createValidator(definition)
  }

  loadValidatorDefinition (name, basePath) {
    const validatorPath = path.join(basePath, 'validator.js')

    if (!fs.existsSync(validatorPath)) {
      debug('not found validator file', validatorPath)
      return null
    }
    else {
      const definitions = require(validatorPath)
      const target = Object.keys(definitions).find(it => it === name)
      return !!target ?  definitions[target] : null
    }
  }

  makeBeforeHooks (name, filePath) {
    const hookService = this.serviceManager.get('hook')
    const hooks = this.loadBeforeHooks(name, filePath) 

    debug('hooks:', hooks)

    const handler = function (ctx, next) {
      return Promise.each(hooks.map(it => it(ctx, next)), (it, index) => {
        debug('before done ', index)
      })
    }

    return hookService.createHook(handler)
  }

  makeAfterHooks (name, filePath) {
    const hookService = this.serviceManager.get('hook')    
    const hooks = this.loadAfterHooks(name, filePath)

    const handler = function (ctx, next) {
      return Promise.each(hooks.map(it => it(ctx, next)), (it, index) => {
        debug('after done ', index)
      })
    }

    return hookService.createHook(handler)
  }

  loadBeforeHooks (name, basePath) {
    return this.loadHooks('before', name, basePath)
  }

  loadAfterHooks (name, basePath) {
    return this.loadHooks('after', name, basePath)
  }

  loadHooks (type, name, basePath) {
    const hookPath = path.join(basePath, 'hooks.js')

    debug(`loadHooks, type: ${type}, name: ${name}, basePath: ${basePath}`)
    if (fs.existsSync(hookPath)) {
      const definitions = require(hookPath)  
      if (type in definitions) {
        const hooks = definitions[type]
        const target = Object.keys(hooks).find(it => it === name)      
        return !!target ? definitions[type][name] : []
      }
    }

    debug('not found hook file', hookPath)
    return []
  }
}