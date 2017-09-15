const TRACE = 1
const DEBUG = 10
const INFO  = 20
const ERROR = 30
const FATAL = 40
const OFF   = 50

const LEVEL_FORMATER = {
  [DEBUG]: 'DEBUG:',
  [INFO]:  'INFO:',
  [TRACE]: 'TRACE:',
  [ERROR]: 'ERROR:',
  [FATAL]: 'FATAL:'
}

module.exports.TRACE = TRACE
module.exports.DEBUG = DEBUG
module.exports.INFO = INFO
module.exports.ERROR = ERROR
module.exports.FATAL = FATAL
module.exports.OFF   = OFF

module.exports.LEVEL_FORMATER = LEVEL_FORMATER