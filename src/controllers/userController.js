import status from 'http-status';
import userService from '../services';
// import { logger } from '../config';
import { hash } from '../utils';

const createUsers = async(req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        const token = await hash.generateToken(newUser[0].first_name, newUser[0].email);
        userService.updateUsersToken(token, newUser[0].email);
        return newUser ?
            res.send(newUser, status.OK) :
            res.send(status.BAD_REQUEST);
    } catch (e) {
        res.send(status.INTERNAL_SERVER_ERROR);
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

export {
    createUsers,
    checkUser
};
