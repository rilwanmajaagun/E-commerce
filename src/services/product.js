/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { productQuery, db } from '../db';

const addProduct = async(body) => {
    const id = uuidv4();
    const {
        product_name,
        category,
        quantity,
        price,
        product_image,
        description
    } = body;
    const payload = [
        id,
        product_name,
        category,
        quantity,
        price,
        product_image,
        description
    ];
    const product = await db.one(productQuery.createProduct, payload);
    return product;
};

const selectProduct = async(body) => {
    const { product_name } = body;
    const name = (product_name) => product_name.charAt(0).toUpperCase() + product_name.slice(1);
    const product = `${name(product_name)}%`;
    return db.oneOrNone(productQuery.getProductByProduct_name, [product]);
};

const selectProductById = async(body) => {
    const { id } = body;
    return db.oneOrNone(productQuery.getProductById, [id]);
};

const getAllProduct = async() => db.manyOrNone(productQuery.getAllProduct);

const getProductByCategory = async(body) => {
    const { category } = body;
    return db.manyOrNone(productQuery.getProductByCategories, [category]);
};

const getAllProductByCategories = async() => {
    const product = await db.any(productQuery.getAllProductByCategory);
    return product;
};

const deleteProduct = async(body) => {
    const { product_name } = body;
    return db.oneOrNone(productQuery.deleteProduct, [product_name]);
};

const updateProduct = async(body) => {
    const { id } = body;
    const oldData = await db.oneOrNone(productQuery.getProductById, [id]);
    const newData = { ...oldData, ...body };
    const product = db.oneOrNone(productQuery.updateProduct, [newData.product_name, newData.category, newData.quantity, newData.price, newData.status, id]);
    return product;
};

const checkStatusAndQuantity = async(product_name) => {
    const product = await db.oneOrNone(productQuery.checkProductStatus, [product_name]);
    return product;
};

const updateQuantityAndStatus = async(quantity, status, product_name) => db.none(productQuery.updateQuantityAndStatus, [quantity, status, product_name]);

export default {
    addProduct,
    selectProduct,
    getAllProduct,
    getProductByCategory,
    getAllProductByCategories,
    deleteProduct,
    updateProduct,
    selectProductById,
    checkStatusAndQuantity,
    updateQuantityAndStatus
};
