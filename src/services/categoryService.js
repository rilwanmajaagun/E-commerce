/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { categoryQuery, db } from '../db';

export default {
    createCategory: async(body) => {
        const id = uuidv4();
        const { name } = body;
        const payload = [id, name];
        return db.one(categoryQuery.createCategory, payload);
    },

    selectCategory: async(body) => {
        const { name } = body;
        return db.oneOrNone(categoryQuery.chechkCategory, name);
    },

    selectAllCategory: async() => db.manyOrNone(categoryQuery.selectAllCategory),

    deleteCategory: async(body) => {
        const { name } = body;
        return db.oneOrNone(categoryQuery.deleteCategory, [name]);
    },

    updateCategory: async(body) => {
        const { name, new_name } = body;
        const category = await db.oneOrNone(categoryQuery.updateCategory, [new_name, name]);
        return category;
    }
};
