const fs = require('fs')
const sinon = require('sinon')
const should = require('chai').should()
const Directory = require('../../directory')

describe('directory test', () => {
  it("should ok", () => {
    const APP_ROOT = "/a/b/c"
    const sandbox = sinon.sandbox.create()
    sandbox.mock(fs).expects('existsSync').once().withExactArgs(APP_ROOT).returns(true)
    const service = Directory.create({ APP_ROOT }, {})        
    sandbox.mock(service).expects("ensureDirectory").once().withExactArgs("LOG_ROOT")    
    service.init()
    sandbox.verifyAndRestore()
  })

  it('should reject with not setup APP_ROOT', () => {
    try {
      const service = Directory.create({}, {})      
    } catch(err) {
      should.exist(err)
      err.should.have.property("message").to.match(/^App Root Not Setup/)
    }
  })

  it('should allow ensureDirectory', () => {
    const name = "aaa"
    const directory = "aaa/csacqs/dsa"
    const APP_ROOT = "/a/b/c"
    const sandbox = sinon.sandbox.create()
    
    sandbox.stub(fs, "existsSync").onFirstCall().returns(true)
      .onSecondCall().returns(false)
    const service = Directory.create({ APP_ROOT }, {})
    sandbox.mock(service).expects("getDirectory").withExactArgs(name).returns(directory)
    sandbox.mock(fs).expects('mkdirSync').once().withExactArgs(directory)
    service.ensureDirectory(name)
    sandbox.verifyAndRestore()
  })

  it('should allow get root path', () => {
    const APP_ROOT = "/a/b/c"

    const directoryList = [
      "MIDDLEWARES_ROOT",
      "HOOK_ROOT",
      "MODEL_ROOT",
      "LOG_ROOT",
      "SERVICE_ROOT",
      "CONTROLLER_ROOT"
    ]
    const sandbox = sinon.sandbox.create() 
    sandbox.stub(fs, "existsSync").returns(true)
    directoryList.forEach(directory => {
      const service = Directory.create({ APP_ROOT }, {})
      sandbox.mock(service).expects("getDirectory")
      const v = service[directory]
    })
    sandbox.verifyAndRestore()    
  })

  it('should allow get directory', () => {
    const APP_ROOT = "/a/b/c"    
    const sandbox = sinon.sandbox.create() 
    sandbox.stub(fs, "existsSync").returns(true)
    const service = Directory.create({ APP_ROOT }, {})
    service.getDirectory("aaa")
    sandbox.verifyAndRestore()  
  })
})