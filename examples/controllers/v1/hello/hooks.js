function preHookSayHello (app) {
  return function (ctx, next) {
    console.log('call before hook')    
    return Promise.resolve("Hellox1")
  }
}

function afterHookSayHello (app) {
  return function (ctx, next) {
    console.log('call after hook')    
    return Promise.resolve("Hellox2")
  }
}

module.exports.before = {
 sayHello: [
  ginkgo.hooks.getHook('sayCommon'),
  preHookSayHello()
 ]
}

module.exports.after = {
  sayHello: [
    afterHookSayHello()
  ]
}