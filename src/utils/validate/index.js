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
    }),
    email: joi.object({
        email: joi.string()
            .email()
            .required()
    }),
    products: joi.object({
        product_name: joi.string()
            .required(),
        category: joi.string()
            .required(),
        quantity: joi.number()
            .required(),
        price: joi.number()
            .required(),
        description: joi.string()

    }),
    product: joi.object({
        product_name: joi.string()
            .required()
    }),
    category: joi.object({
        category: joi.string()
            .required()
    }),
    updateCategory: joi.object({
        name: joi.string()
            .required(),
        new_name: joi.string()
            .required()
    }),
    updateProducts: joi.object({
        product_name: joi.string(),
        category: joi.string(),
        quantity: joi.number(),
        price: joi.number(),
        status: joi.string().valid('in_stock', 'out_of_stock'),
        id: joi.string().uuid()
    }),
    createOrder: joi.object({
        quantity: joi.number()
            .required(),
        product_name: joi.string()
            .required()
    }),
    updateStatus: joi.object({
        order_id: joi.string()
            .uuid(),
        delivery_status: joi.string()
            .valid('pending', 'shipped', 'delivered')
            .optional(),
        order_status: joi.string()
            .valid('review', 'cancelled')
            .optional()

    }),
    product_id: joi.object({
        product_id: joi.string()
            .uuid().required(),
        order_id: joi.string().uuid().optional()
    }),
    address_details: joi.object({
        first_name: joi.string()
            .required(),
        last_name: joi.string()
            .required(),
        mobile_number: joi.number()
            .required(),
        additional_mobile_number: joi.number().allow(''),
        address: joi.string()
            .required(),
        state_region: joi.string()
            .required(),
        city: joi.string()
            .required()
    }),
    updateAddress: joi.object({
        id: joi.string()
            .uuid()
            .required(),
        first_name: joi.string().allow('')
            .optional(),
        last_name: joi.string().allow('')
            .optional(),
        mobile_number: joi.number().allow('')
            .optional(),
        additional_mobile_number: joi.number().allow(''),
        address: joi.string().allow('')
            .optional(),
        state_region: joi.string().allow('')
            .optional(),
        city: joi.string().allow('')
            .optional()
    })
};

export default schema;
