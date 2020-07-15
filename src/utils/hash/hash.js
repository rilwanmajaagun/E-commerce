import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helpers = {
    hashPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        if (hash && salt) {
            return { salt, hash };
        }
        return false;
    },
    async generateToken(first_name, email) {
        const key = process.env.SECRET_KEY;
        const token = jwt.sign({
            first_name,
            email
        }, key,
        { expiresIn: '1h' });
        return token;
    }
};

export default Helpers;
