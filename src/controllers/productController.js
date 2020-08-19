import status from 'http-status';
import { productService } from '../services';
import { client } from '../config';
import { aws } from '../middlewares';

const addProduct = async(req, res) => {
    try {
        const myFile = req.file;
        const picture = await aws.uploadImage(myFile);
        req.body.product_image = picture.Location;
        const product = await productService.addProduct(req.body);
        return product ?
            res.status(status.CREATED).send({
                message:
                    'product Added Successfully',
                data: {
                    id: product.id,
                    product_name: product.product_name,
                    category: product.category,
                    status: product.status,
                    quantity: product.quantity,
                    price: product.price,
                    product_image: product.product_name,
                    description: product.product_description
                }
            }) :
            res.status(status.BAD_REQUEST).send({
                message: 'Error adding product',
                data: {}
            });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const getSpecifyProduct = async(req, res) => {
    try {
        const product = await productService.selectProduct(req.body);
        return res.status(status.OK).send({
            message: 'Product found',
            data: {
                id: product.id,
                product: product.product_name,
                category: product.category,
                status: product.status,
                quantity: product.quantity,
                price: product.price,
                image: product.product_image,
                description: product.product_description
            }
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const selectAllProduct = async(req, res) => {
    try {
        client.get('allProduct', async(error, result) => {
            if (result) {
                return res.status(status.OK).send({
                    message: 'successfully fetched all product',
                    data: JSON.parse(result)
                });
            }
            const product = await productService.getAllProduct();
            if (product) {
                client.set('allProduct', JSON.stringify(product));
                client.expire('allProduct', 300); /*  expires in five minute*/
                return res.status(status.OK).send({
                    message: 'successfully fetched all product',
                    data: product

                });
            }
            return res.status(status.BAD_REQUEST).send({
                message: 'Error get all Product',
                data: null
            });
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const selectProductByCategory = async(req, res) => {
    try {
        const product = await productService.getProductByCategory(req.body);
        return product.length > 0 ?
            res.status(status.OK).send({
                message: 'Product found',
                data: product
            }) :
            res.status(status.BAD_REQUEST).send({ message: 'No Product found' });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getAllProductByCategories = async(req, res) => {
    try {
        client.get('allProductByCategories', async(error, result) => {
            if (result) {
                return res.status(status.OK).send({
                    message: 'successfully fetched all product',
                    data: JSON.parse(result)
                });
            }
            const product = await productService.getAllProductByCategories();
            if (product) {
                client.set('allProductByCategories', JSON.stringify(product));
                client.expire('allProductByCategories', 300); /*  expires in five minute*/
                return res.status(status.OK).send({
                    message: 'successfully fetch all product',
                    data: product

                });
            }
            return res.status(status.BAD_REQUEST).send({
                message: 'Error get all Product',
                data: null
            });
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const deleteProduct = async(req, res) => {
    try {
        const product = await productService.deleteProduct(req.body);
        return res.status(status.OK).send({
            message: `${product.product_name} Deleted successfully`
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const updateProduct = async(req, res) => {
    try {
        const product = await productService.updateProduct(req.body);
        return res.status(status.CREATED).send({
            message: 'product updated Successfully',
            data: product
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

export default {
    addProduct,
    getSpecifyProduct,
    selectAllProduct,
    selectProductByCategory,
    getAllProductByCategories,
    deleteProduct,
    updateProduct
};
