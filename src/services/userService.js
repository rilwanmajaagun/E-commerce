/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { userQuery, db } from '../db';
import { hash } from '../utils';
// import { logger } from '../config';

const createUser = async(body) => {
    const id = uuidv4();
    const {
        first_name,
        last_name,
        email,
        password,
        phone_number
    } = body;
    const email_address = email.toLowerCase();
    const firsName = (first_name) => first_name.charAt(0).toUpperCase() + first_name.slice(1);
    const LastName = (last_name) => last_name.charAt(0).toUpperCase() + last_name.slice(1);
    const hashedPassword = hash.hashPassword(password);
    const payload = [id, firsName(first_name), LastName(last_name), email_address, phone_number, hashedPassword.hash, hashedPassword.salt];
    return db.one(userQuery.createUser, payload);
};

const checkIfUserExist = async(email) => {
    const email_address = email.toLowerCase();
    const data = await db.oneOrNone(userQuery.getUser, [email_address]);
    return data;
};

const activateUser = async(email) => {
    const data = await db.oneOrNone(userQuery.activateUser, [email]);
    return data;
};

const resetPassword = async(email, body) => {
    const { password } = body;
    const hashedPassword = hash.hashPassword(password);
    const payload = [hashedPassword.hash, email];
    return db.oneOrNone(userQuery.resetPassword, payload);
};

export default {
    createUser,
    checkIfUserExist,
    activateUser,
    resetPassword
};
