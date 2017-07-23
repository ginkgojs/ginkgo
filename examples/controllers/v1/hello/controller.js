module.exports.sayHello = function sayHello (ctx, next) {
  console.log('Hello World')
  ctx.body = 'Hello World'
}