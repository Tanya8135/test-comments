const Joi = require('joi')

const textSchema = Joi.object({
    name: Joi.string(),
    text: Joi.string().required().min(7).max(1000)
})

module.exports = textSchema