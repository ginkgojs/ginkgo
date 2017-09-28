const util = require('util')
const sinon = require('sinon')
const should = require('chai').should()
const Exception = require('../../exception/exception')

describe("exception test", () => {
  it('should allow create', () => {
    const exception =  Exception.create()
    should.exist(exception)
  })

  it('should allow format', () => {
    const message = "Hello World"
    const args = [1, 2, 3]
    const exception =  Exception.create(0, args, message)
    const sandbox = sinon.sandbox.create()  
    sandbox.mock(util).expects("format").once().withExactArgs(message, ...args)
    exception.format()
    sandbox.verifyAndRestore()
  })
})