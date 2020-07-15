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
    return db.any(userQuery.createUser, payload);
};

const checkIfUserExist = async(body) => {
    const { email } = body;
    const data = await db.oneOrNone(userQuery.getUser, [email]);
    return data;
};

const updateUsersToken = async(token, email) => {
    db.none(userQuery.updateUsersToken, [token, email]);
};

export default {
    createUser,
    checkIfUserExist,
    updateUsersToken
};
