const util = require('util')
const sinon = require('sinon')
const should = require('chai').should()
const HttpException = require('../../exception/http_exception')

describe('http exception test', () => {
  it('should allow create', () => {
    const exception = HttpException.create()
    should.exist(exception)
  })

  it('should allow get status', () => {
    const exception = HttpException.create()
    const status = exception.getStatus()    
    status.should.to.equal(500)
  })

  it('should allow set status', () => {
    const exception = HttpException.create()
    exception.setStatus(200)
    const status = exception.getStatus()
    status.should.to.equal(200)
  })
})