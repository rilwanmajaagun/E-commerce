import joi from '@hapi/joi';

const schema = {
    user: joi.object({
        first_name: joi.string()
            .required(),
        last_name: joi.string()
            .required(),
        email: joi.string()
            .email()
            .required(),
        phone_number: joi.number(),
        password: joi.string()
            .min(5).message('password too weak, must not be less than five character')
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .message('password must contain')
    }),
    login: joi.object({
        email: joi.string()
            .email()
            .required(),
        password: joi.string()
            .required()
    })
};

export default schema;
