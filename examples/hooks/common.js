module.exports.sayCommon = function (ctx, next) {
  console.log('sayCommon')
  return Promise.resolve("sayCommon")  
}