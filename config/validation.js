const Joi = require('@hapi/joi'); // Validation package

const registerValidation = (data) => {
    const schema = Joi.object({ // New Joi Object that will validate incoming data against my schemas
        username: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]*$')), // Making username only letters and numbers
        email: Joi.string().min(6).required().email(), // Checking if email
        password: Joi.string().min(6).required(),
        password2: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required().max(50),
        message: Joi.string().min(3).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
