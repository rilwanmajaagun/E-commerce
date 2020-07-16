import status from 'http-status';
import bcrypt from 'bcrypt';
import userService from '../services';
// import { logger } from '../config';
import { hash } from '../utils';

const createUsers = async(req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        await hash.generateToken(newUser[0].first_name, newUser[0].email);
        return newUser ?
            res.send({
                message: 'user created sucessfully',
                data: {
                    id: newUser[0].id,
                    email: newUser[0].email,
                    date_created: newUser[0].created_at
                }
            }, status.CREATED) :
            res.send({
                message: 'error creating user',
                data: null
            }, status.BAD_REQUEST);
    } catch (e) {
        res.send({
            message: status[500],
            data: null
        }, status.INTERNAL_SERVER_ERROR);
    }
};

const checkUser = async(req, res) => {
    try {
        const user = await userService.checkIfUserExist(req.body);
        return res.send(user, status.OK);
    } catch (e) {
        return res.send(e);
    }
};

const login = async(req, res) => {
    const { password } = req.body;
    try {
        const user = await userService.checkIfUserExist(req.body);
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = await hash.generateToken(user.first_name, user.email);
            return res.send({
                message: 'login successful',
                data: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    token
                }
            }, status.OK);
        }
        return res.send({
            message: 'Incorrect password',
            data: null
        }, status.BAD_REQUEST);
    } catch (e) {
        return res.send(e);
    }
};

export {
    createUsers,
    checkUser,
    login
};
