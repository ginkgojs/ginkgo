const sinon = require('sinon')
const should = require('chai').should()
const Logger = require('../../logger')
const LogLevel = require('../../logger/log_level')

describe('logger test', () => {
  describe('create logger test', () => {
    it('should ok', () => {
      const logger = Logger.create({}, {})
      logger.init()
    })

    it('should reject with unknow printer', () => {
      try {
        const option = { prints: [{}] }      
        const logger = Logger.create(option, {})      
        logger.init()
      } catch(err) {
        err.should.exist;
        err.should.have.property("message").to.match(/^Unknow Print/)
      }
    })

    it('should reject with unknow format', () => {
      try {
        const option = { formats: ["xxx"] }
        const logger = Logger.create(option, {})      
        logger.init()        
      } catch(err) {
        err.should.exist;
        err.should.have.property("message").to.match(/^Unknow Format Type/)
      }
    })
  })

  describe("logger method test", () => {
    it('should allow fatal ok', () => {
      const sandbox = sinon.sandbox.create()
      const logger = Logger.create({}, {})      
      sandbox.mock(logger).expects("write").once().withExactArgs(LogLevel.FATAL, "%s", "Hello Fatal")
      logger.fatal("%s", "Hello Fatal")
      sandbox.verifyAndRestore()
    })

    it('should allow error ok', () => {
      const sandbox = sinon.sandbox.create()
      const logger = Logger.create({}, {})      
      sandbox.mock(logger).expects("write").once().withExactArgs(LogLevel.ERROR, "%s", "Hello Error")
      logger.error("%s", "Hello Error")
      sandbox.verifyAndRestore()
    })

    it('should allow trace ok', () => {
      const sandbox = sinon.sandbox.create()
      const logger = Logger.create({}, {})      
      sandbox.mock(logger).expects("write").once().withExactArgs(LogLevel.TRACE, "%s", "Hello Trace")
      logger.trace("%s", "Hello Trace")
      sandbox.verifyAndRestore()
    })

    it('should allow debug ok', () => {
      const sandbox = sinon.sandbox.create()
      const logger = Logger.create({}, {})      
      sandbox.mock(logger).expects("write").once().withExactArgs(LogLevel.DEBUG, "%s", "Hello Debug")
      logger.debug("%s", "Hello Debug")
      sandbox.verifyAndRestore()
    })

    it('should allow info ok', () => {
      const sandbox = sinon.sandbox.create()
      const logger = Logger.create({}, {})      
      sandbox.mock(logger).expects("write").once().withExactArgs(LogLevel.INFO, "%s", "Hello Info")
      logger.info("%s", "Hello Info")
      sandbox.verifyAndRestore()
    })
  })

  describe("logger write test", () => {
    it("should ok", () => {
      const logger = Logger.create({}, {})
      const sandbox = sinon.sandbox.create()
      const formater = { format: function() {}}

      logger.init()
      sandbox.mock(logger).expects("getFormater").once().withExactArgs("%s").returns(formater)
      sandbox.mock(formater).expects("format").once().withExactArgs(LogLevel.DEBUG, "%s", "hello world")
      logger.write(LogLevel.DEBUG, "%s", "hello world")      
      sandbox.verifyAndRestore()
    })
  })
})