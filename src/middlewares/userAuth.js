import status from 'http-status';
// eslint-disable-next-line import/no-cycle
import { userService } from '../services';
import { hash } from '../utils';

const signup = async(req, res, next) => {
    const { email } = req.body;
    try {
        const data = await userService.checkIfUserExist(email);
        if (data) {
            return res.status(status.CONFLICT).send({
                message: 'user already exist'
            });
        }
        next();
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send(status[500]);
    }
};

const login = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userService.checkIfUserExist(email);
        const match = await hash.comparePassword(password, user.password);
        if (!user) {
            return res.send({
                message: 'user not found'
            }, status.CONFLICT);
        }
        if (!match) {
            return res.status(status.BAD_REQUEST).send({
                message: 'Incorrect password',
                data: null
            });
        }
        if (user.is_active === false) {
            return res.status(status.UNAUTHORIZED).send({
                message: 'verify email address'
            });
        }
    } catch (e) {
        return res.status(status.INTERNAL_SERVER_ERROR).send(status[500]);
    }
    next();
};

const confrimationToken = async(req, res, next) => {
    const { email } = req.body;
    try {
        const user = await userService.checkIfUserExist(email);
        if (!user) {
            return res.status(status.BAD_REQUEST).send({
                message: 'user not found'
            });
        }
        if (user.is_active === true) {
            return res.status(status.BAD_REQUEST).send({
                message: 'Account is verified'
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send(status[500]);
    }
    next();
};

const is_active = async(req, res, next) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        if (user.is_active === true) {
            return res.status(status.BAD_REQUEST).send({
                message: 'Account is verified'
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send(status[500]);
    }
    next();
};

const verifyToken = async(req, res, next) => {
    const token = req.query.token || req.headers.token;
    if (!token) {
        return res.status(status.BAD_REQUEST).send({
            message: 'token not provided'
        });
    }
    try {
        const decoded = await hash.decodeToken(token);
        req.user = {
            first_name: decoded.first_name,
            email: decoded.email
        };
        res.locals.user = req.user;
    } catch (error) {
        res.status(status.BAD_REQUEST).send({
            message: error
        });
    }
    next();
};

const adminAuthorization = async(req, res, next) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        if (!user.is_admin) {
            return res.status(status.FORBIDDEN).send({
                message: 'user not allowed'
            });
        }
    } catch (error) {
        res.status(status.BAD_REQUEST).send({
            message: error.message
        });
    }
    next();
};

const socialMeadiAuth = async(request) => {
    const token = await hash.generateToken(request.user.first_name, request.user.email);
    return token;
    // res.status(status.OK).send({
    //     message: 'successful',
    //     data: {
    //         id: request.user.id,
    //         first_name: request.user.first_name,
    //         last_name: request.user.last_name,
    //         email: request.user.email,
    //         token
    //     }
    // });
};

export default {
    signup,
    login,
    confrimationToken,
    verifyToken,
    is_active,
    adminAuthorization,
    socialMeadiAuth
};
