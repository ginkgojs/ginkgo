const Joi = require('joi')

module.exports = {
  'sayHello': {
    id: Joi.string().required()
  }
}