const debug = require('debug')('ginkgo:configure')

function Configure(config, options) {
  if (!(this instanceof Configure)) {
    return new Configure(config, options)
  }
  this._config = config
  this._options = options
}

Configure.prototype._parseArgs = function (args) {
  if (!args) {
    throw new Error("Get Configure Invalid Parameter")    
  }
  return args.split('.')
}

Configure.prototype._getValue = function (args) {
  let target = this._config
  const elems = this._parseArgs(args)  

  for (let v of elems) {
    if (!target || target[v] === undefined) {
      throw new Error("Get Configure Fail")      
    }
    target = target[v]
  }

  return target
}

Configure.prototype.has = function (args) {
  try {
    this._getValue(args)
  } catch (e) {
    return false
  }
  return true
}

Configure.prototype.get = function (args) {
  const val = this._getValue(args)
  if (typeof val === 'object' && val !== null) {
    return this._freeze(Object)
  } else {
    return val
  }
}

Configure.prototype._freeze = function (value) {
  function freezeObject (obj) {
    const result = Object.keys(obj).reduce((acc, cur) => {
      if (typeof obj[cur] === 'object' && obj[cur] !== null) {
        acc[cur] = freezeObject(obj[cur])
      } else {
        acc[cur] = obj[cur]
      }
    }, {})
    return Object.freeze(result)
  }

  return freezeObject(value)
}

module.exports = Configure