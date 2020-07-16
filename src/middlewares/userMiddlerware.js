import status from 'http-status';
import userService from '../services';
import { schema } from '../utils';

const signupMiddleware = async(req, res, next) => {
    try {
        await schema.user.validateAsync(req.body);
        const data = await userService.checkIfUserExist(req.body);
        if (data) {
            return res.send({
                message: 'user already exist'
            }, status.CONFLICT);
        }
    } catch (e) {
        return res.send({
            message: e.details[0].message.replace(/[\"]/gi, '') || status[500]
        }, status.BAD_REQUEST || status.INTERNAL_SERVER_ERROR);
    }
    next();
};

const loginMiddleware = async(req, res, next) => {
    try {
        await schema.login.validateAsync(req.body);
        const data = await userService.checkIfUserExist(req.body);
        if (!data) {
            return res.send({
                message: 'user not found'
            }, status.CONFLICT);
        } if (data.is_active === false) {
            return res.send({
                message: 'verify email address'
            }, status.UNAUTHORIZED);
        }
    } catch (e) {
        return res.send({
            message: e.details[0].message.replace(/[\"]/gi, '') || status[500]
        }, status.BAD_REQUEST || status.INTERNAL_SERVER_ERROR);
    }
    next();
};

export default {
    signupMiddleware,
    loginMiddleware
};
