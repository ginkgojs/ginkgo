const debug = require('debug')('ginkgo:configure')

function ConfigWrapper(config, options) {
  if (!(this instanceof ConfigWrapper)) {
    return new ConfigWrapper(config, options)
  }
  this._config = config
  this._options = options
}

ConfigWrapper.prototype._parseArgs = function (args) {
  if (!args) {
    throw new Error("Get Configure Invalid Parameter")    
  }
  return args.split('.')
}

ConfigWrapper.prototype._getValue = function (args) {
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

ConfigWrapper.prototype.has = function (args) {
  try {
    this._getValue(args)
  } catch (e) {
    return false
  }
  return true
}

ConfigWrapper.prototype.get = function (args) {
  const val = this._getValue(args)
  if (typeof val === 'object' && val !== null) {
    return this._freeze(Object)
  } else {
    return val
  }
}

ConfigWrapper.prototype._freeze = function (value) {
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

module.exports = ConfigWrapper