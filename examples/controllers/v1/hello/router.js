const controller = require('./controller')

module.exports = [
  { method: 'GET', url: '/abc', handler: controller.sayHello }
]