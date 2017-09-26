const sinon = require('sinon')
const should = require('chai').should()
const Configure = require('../../configure/config')

describe('configure test', () => {
  describe('configure get test', () => {
    it('should return null', () => {
      const arg = 123
      const config = new Configure()
      const sandbox = sinon.sandbox.create()
      sandbox.mock(config).expects('_getValue').once().withArgs(arg).returns(null)
      const ret = config.get(arg)
      should.equal(ret, null) 
      sandbox.verifyAndRestore()
    })

    it('should return freeze object', () => {
      const arg = 123
      const value = { a: 1 }
      const config = new Configure()
      const sandbox = sinon.sandbox.create()
      sandbox.mock(config).expects('_getValue').once().withArgs(arg).returns(value)
      sandbox.mock(config).expects('_freeze').once().withArgs(value)
      config.get(arg)
      sandbox.verifyAndRestore()
    })
  })

  describe('freeze test', () => {
    it('should ok', () => {
      const arg = { a: 1, b: { v: 2 } }
      const config = new Configure()
      const ret = config._freeze(arg)      
      ret.a.should.equal(1)
      ret.a = 2
      ret.a.should.equal(1)
      ret.b.v = 3
      ret.b.v.should.equal(2)
    })
  })

  describe('getValue test', () => {
    it('should ok', () => {
      const arg = 'a'
      const config = new Configure({ a: 1 })
      const sandbox = sinon.sandbox.create()  
      sandbox.mock(config).expects('_parseArgs').withExactArgs(arg).returns(['a'])
      const ret = config._getValue(arg)
      ret.should.be.equal(1)
      sandbox.verifyAndRestore()
    })

    it('should allow parseArgs', () => {
      const args = "a.b.c"
      const config = new Configure()
      const ret = config._parseArgs(args)
      ret.should.be.deep.equal(['a', 'b', 'c'])
    })

    it('should reject parseArgs with undefined args', () => {
      const config = new Configure()
      try {
        config._parseArgs()      
      } catch(err) {
        err.should.have.property("message").to.equal("Get Configure Invalid Parameter")
      }
    })
  })

  describe('has test', () => {
    it('should ok', () => {
      const config = new Configure()
      const sandbox = sinon.sandbox.create()
      const arg = 123
      sandbox.mock(config).expects('_getValue').once().withArgs(arg).returns()
      const ret = config.has(arg)
      ret.should.equal(true)
      sandbox.verifyAndRestore()
    })

    it('should reject with not found', () => {
      const config = new Configure()
      const sandbox = sinon.sandbox.create()
      const arg = 123
      sandbox.mock(config).expects('_getValue').once().withArgs(arg).throws()
      ret = config.has(arg)    
      ret.should.equal(false)
      sandbox.verifyAndRestore()
    })
  })
})