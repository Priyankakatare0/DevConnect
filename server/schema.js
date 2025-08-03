const joi = require('joi');
const joiObjectId = require('joi-objectid')(joi);

module.exports.userSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
 password: joi.string()
  .pattern(new RegExp('^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$'))
  .required(),
    bio: joi.string().optional().allow(''),
});

module.exports.postSchema = joi.object({
    content: joi.string().required(),
});