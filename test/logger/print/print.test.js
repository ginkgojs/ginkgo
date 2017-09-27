const fs = require('fs')
const sinon = require('sinon')
const should = require('chai').should()
const PrinterCreator = require('../../../logger/print')

describe("logger print test", () => {
  describe("std printer test", () => {
    it("should allow create", () => {
      PrinterCreator("std")
    })

    it("should allow write", () => {
      const message = "Hello World"
      const options = { stream: { write: function() {} }}
      const printer = PrinterCreator("std", options)
      const sandbox = sinon.sandbox.create()
      sandbox.mock(options.stream).expects("write").once().withExactArgs(message)
      printer.write(message)
      sandbox.verifyAndRestore()
    })
  })

  describe("file printer test", () => {
    it("should allow create file printer", () => {
      const options = { path: "/a/b/c.txt" }
      const sandbox = sinon.sandbox.create()
      sandbox.mock(fs).expects("existsSync").once().withExactArgs("/a/b").returns(true)
      PrinterCreator("file", options)
      sandbox.verifyAndRestore()
    })

    it("should allow write", () => {
      const message = "Hello World"      
      const options = { path: "/a/b/c.txt" }
      const sandbox = sinon.sandbox.create()
      sandbox.mock(fs).expects("existsSync").once().withExactArgs("/a/b").returns(true)
      const printer = PrinterCreator("file", options)
      sandbox.mock(fs).expects("writeFileSync").once().withExactArgs(options.path, message)
      printer.write(message)
      sandbox.verifyAndRestore()
    })
  })
})