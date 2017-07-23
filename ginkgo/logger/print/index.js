const StdPrint = require('./std_print')
const FilePrint = require('./file_print')

module.exports = function (type, options) {
  switch (type) {
    case 'std': {
      return new StdPrint(options)
    }
    case 'file': {
      return new FilePrint(options)
    }
  }
}