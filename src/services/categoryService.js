/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { categoryQuery, db } from '../db';

const createCategory = async(body) => {
    const id = uuidv4();
    const { name } = body;
    const payload = [id, name];
    return db.one(categoryQuery.createCategory, payload);
};

const selectCategory = async(body) => {
    const { name } = body;
    return db.oneOrNone(categoryQuery.chechkCategory, name);
};

const selectAllCategory = async() => db.manyOrNone(categoryQuery.selectAllCategory);

const deleteCategory = async(body) => {
    const { name } = body;
    return db.oneOrNone(categoryQuery.deleteCategory, [name]);
};

const updateCategory = async(body) => {
    const { name, new_name } = body;
    const category = await db.oneOrNone(categoryQuery.updateCategory, [new_name, name]);
    return category;
};

export default {
    createCategory,
    selectCategory,
    selectAllCategory,
    deleteCategory,
    updateCategory
};
