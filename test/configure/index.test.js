const fs = require('fs')
const chai = require('chai')
const sinon = require('sinon')
const should = chai.should()
const ConfigureService = require('../../configure')

describe('configure test', () => {
  describe('create service test', () => {
    it('should ok', () => {
      const service = new ConfigureService()
      service.should.have.property('options')
      service.should.have.property('serviceManager')
    })
  })

  describe('init service test', () => {
    it('should ok', () => {
      const app = { env: 'development' }    
      const serviceManager = { get: function() {} }    
      const dirService = { CONFIG_ROOT: '/123/abc/' }
      const service = new ConfigureService({}, serviceManager)
  
      const sandbox = sinon.sandbox.create()
      sandbox.mock(serviceManager).expects('get').once().withExactArgs('directory').returns(dirService)
      sandbox.mock(fs).expects('existsSync').once().withExactArgs(dirService.CONFIG_ROOT).returns(true)
      sandbox.mock(service).expects('loadConfig').once().withExactArgs(app.env)
      service.init(app)
      sandbox.verifyAndRestore()
    })

    it('should reject with Configure Root Path not exists', () => {
      const app = { env: 'development' }    
      const serviceManager = { get: function() {} }    
      const dirService = { CONFIG_ROOT: '/123/abc/' }
      const service = new ConfigureService({}, serviceManager)
  
      const sandbox = sinon.sandbox.create()
      sandbox.mock(serviceManager).expects('get').once().withExactArgs('directory').returns(dirService)
      sandbox.mock(fs).expects('existsSync').once().withExactArgs(dirService.CONFIG_ROOT).returns(false)
      try {
        service.init(app)        
      } catch(err) {
        err.should.have.property('message').equal('Configure Root Path not exists')
      }
      sandbox.verifyAndRestore()
    })
  })

  describe('load config test', () => {
    it('should ok', () => {
      const service = new ConfigureService()
      const sandbox = sinon.sandbox.create()
      sandbox.stub(service, 'loadConfigFile').onFirstCall().returns({a: 1})
        .onSecondCall().returns({b: 2})
      sandbox.mock(service).expects('wrapConfig').withExactArgs({a: 1}, {b: 2})
      service.loadConfig("development")
      sandbox.verifyAndRestore()
    })
  })

  describe('test getter setter', () => {
    it('should ok', () => {
      const service = new ConfigureService()
      const sandbox = sinon.sandbox.create()
      const configure = { get: function() {}, has: function() {} }

      sandbox.stub(service, 'getConfigRoot').returns("/a/b")
      sandbox.stub(service, 'loadConfig').returns(configure)

      sandbox.mock(configure).expects('get').withExactArgs(1)
      sandbox.mock(configure).expects('has').withExactArgs(2)

      service.init({})
      service.get(1)
      service.has(2)
      sandbox.verifyAndRestore()
    })
  })
})