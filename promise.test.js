const Promise = require('bluebird')

function preHookSayHello (app) {
  console.log('call before hook')
  return Promise.resolve("Hellox")
}

function preHookSayHello2 (app) {
  console.log('call before hook2')
  return Promise.resolve("Hellox2")
}

Promise.each([preHookSayHello(), preHookSayHello2()], it => {
  console.log('done')
})
.then(result => {
  console.dir(result)
})
