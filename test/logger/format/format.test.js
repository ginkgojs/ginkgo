const util = require('util')
const sinon = require('sinon')
const should = require('chai').should()
const LogLevel = require('../../../logger/log_level')
const formatCreator = require('../../../logger/format')

describe("logger format test", () => {
  describe("std format test", () => {
    it("should allow create", () => {
      formatCreator("std")
    })

    it("should allow format", () => {
      const formater = formatCreator("std")
      const sandbox = sinon.sandbox.create()
      const level = LogLevel.DEBUG
      const str = "Hello"
      const msg = LogLevel.LEVEL_FORMATER[level]
      sandbox.mock(util).expects("format").once().withExactArgs(msg + str)
      formater.format(level, str)
      sandbox.verifyAndRestore()
    })

    it("should allow match", () => {
      const formater = formatCreator("std")
      const ret = formater.match("Hello")      
      ret.should.to.equal(true)
    })
  })

  describe("error format test", () => {
    it("should allow create", () => {
      formatCreator("error")
    })

    it("should allow format", () => {
      const formater = formatCreator("error")
      const sandbox = sinon.sandbox.create()
      const level = LogLevel.DEBUG
      const error = { code: 123, message: "Hello World" }
      const msg = LogLevel.LEVEL_FORMATER[level]
      sandbox.mock(util).expects("format").once().withExactArgs(msg + ` error code: ${error.code}, message: ${error.message}`)
      formater.format(level, error)
      sandbox.verifyAndRestore()   
    })

    it("should allow match", () => {
      const formater = formatCreator("error")
      const arg = new Error()
      const ret = formater.match(arg)
      ret.should.to.equal(true)
    })
  })
})