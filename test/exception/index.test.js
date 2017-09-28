const sinon = require('sinon')
const should = require('chai').should()
const ExceptionService = require('../../exception')
const Exception = require('../../exception/exception')
const HttpException = require('../../exception/http_exception')

describe('exception test', () => {
  describe('create instance', () => {
    it('should ok', () => {
      const service = ExceptionService.create({}, {})
      service.init()
      should.exist(service)
    })
  })

  describe('create normal exception', () => {
    it('should allow create with code', () => {
      const code = 1234
      const manager = { get: function() {} }
      const locale = { fetch: function() {} }
      const sandbox = sinon.sandbox.create()
  
      const service = ExceptionService.create({}, manager)
      sandbox.stub(manager, "get").returns(locale)
      sandbox.mock(locale).expects('fetch').once().withExactArgs(code)
      sandbox.stub(Exception, "create").returns()
      service.createException(code)

      sandbox.verifyAndRestore()
    })
   
    it('should allow create without code', () => {
      const manager = { get: function() {} }
      const locale = { fetch: function() {} }
      const sandbox = sinon.sandbox.create()
  
      const service = ExceptionService.create({}, manager)
      sandbox.stub(Exception, "create").returns()
      service.createException()
  
      sandbox.verifyAndRestore()
    })
  })

  describe('create validate error', () => {
    it('should ok', () => {
      const sandbox = sinon.sandbox.create()
      const service = ExceptionService.create({}, {})
      sandbox.stub(HttpException, "create").returns()
      service.createValidateError({})
      sandbox.verifyAndRestore()
    })
  })

  describe('create http exception', () => {
    it('should allow create with default error code', () => {
      const manager = { get: function() {} }
      const locale = { fetch: function() {} }
  
      const sandbox = sinon.sandbox.create()
      const service = ExceptionService.create({}, manager)    
      sandbox.mock(manager).expects("get").once().withExactArgs("locale").returns(locale)
      sandbox.mock(HttpException).expects("create").once().returns()      
      service.createHttpException()
      sandbox.verifyAndRestore()
    })

    it('should allow create with error code', () => {
      const manager = { get: function() {} }
      const locale = { fetch: function() {} }
      const code = 100
      const sandbox = sinon.sandbox.create()
      const service = ExceptionService.create({}, manager)    
      sandbox.mock(manager).expects("get").once().withExactArgs("locale").returns(locale)
      sandbox.mock(HttpException).expects("create").once().returns()      
      sandbox.mock(locale).expects('fetch').withExactArgs(code)
      service.createHttpException(200, code)
      sandbox.verifyAndRestore()
    })
  })
})