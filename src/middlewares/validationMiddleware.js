import Joi from 'joi';

export const validateRegisterUserRequest = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        name: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    next();
};

export const validateLoginUserRequest = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().required(),
        email: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    next();
};