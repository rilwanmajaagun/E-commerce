/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { productQuery, db } from '../db';

const addProduct = async(body) => {
    const id = uuidv4();
    const {
        product_name,
        category,
        quantity,
        price
    } = body;
    const payload = [
        id,
        product_name,
        category,
        quantity,
        price];
    const product = await db.any(productQuery.createProduct, payload);
    return product;
};
const selectProduct = async(body) => {
    const { product_name } = body;
    return db.oneOrNone(productQuery.getProductByProduct_name, [product_name]);
};
const selectProductByid = async(body) => {
    const { id } = body;
    return db.oneOrNone(productQuery.getProductByid, [id]);
};
const getAllProduct = async() => db.manyOrNone(productQuery.getAllProduct);

const getProductBycategory = async(body) => {
    const { category } = body;
    return db.manyOrNone(productQuery.getProductByCategories, [category]);
};

const getAllProductBycategories = async() => {
    const product = await db.any(productQuery.getAllProductByCategory);
    return product;
};

const deleteProduct = async(body) => {
    const { product_name } = body;
    return db.oneOrNone(productQuery.deleteProduct, [product_name]);
};

const updateProduct = async(body) => {
    const { id } = body;
    const oldData = await db.oneOrNone(productQuery.getProductByid, [id]);
    const newdata = { ...oldData, ...body };
    const product = db.oneOrNone(productQuery.updateProduct, [newdata.product_name, newdata.category, newdata.quantity, newdata.price, newdata.status, id]);
    return product;
};

export default {
    addProduct,
    selectProduct,
    getAllProduct,
    getProductBycategory,
    getAllProductBycategories,
    deleteProduct,
    updateProduct,
    selectProductByid
};
