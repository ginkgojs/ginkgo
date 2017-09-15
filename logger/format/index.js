const StdFormat = require('./std_format')
const ErrorFormat = require('./error_format')

module.exports = function (type) {
  switch (type) {
    case 'std': {
      return new StdFormat()
    }
    case 'error': {
      return new ErrorFormat()
    }
  }
}