import status from 'http-status';
import jwt from 'jsonwebtoken';
import { userService } from '../services';
import { hash, response } from '../utils';
import { mailing, client } from '../config';

const createUsers = async(req, res) => {
    try {
        const {
            id, first_name, email, created_at
        } = await userService.createUser(req.body);
        const token = await hash.generateToken(first_name, email);
        await hash.refresh_token(first_name, email, id);
        mailing.signupMail(email, first_name, token);
        return id ?
            res.status(status.CREATED).send({
                message: 'user created Successfully',
                data: {
                    id,
                    first_name,
                    email,
                    date_created: created_at,
                    token
                }
            }) :
            res.status(status.BAD_REQUEST).send({
                message: 'error creating user',
                data: null
            });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const checkUser = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.checkIfUserExist(email);
        return res.send(user, status.OK);
    } catch (e) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const userDetails = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        return res.status(status.OK).send({
            message: 'login successful',
            data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        });
    } catch (e) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const login = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.checkIfUserExist(email);
        const token = await hash.generateToken(user.first_name, user.email);
        await hash.refresh_token(user.first_name, user.email, user.id);
        // const refresh_token = jwt.sign({ first_name: user.first_name, email: user.email }, process.env.REFRESH_TOKEN_SECRET);
        // client.set('refresh_token', refresh_token);
        return res.status(status.OK).send({
            message: 'login successful',
            data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                token
            }
        });
    } catch (e) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const refresh_token = async(req, res) => {
    try {
        client.get(`${await response.user_id(res)},refresh_token`, async(error, result) => {
            if (error) {
                return res.status(status.FORBIDDEN).send(status[403]);
            }
            if (result === null) {
                return res.status(status.UNAUTHORIZED).send(status[401]);
            }
            if (result) {
                jwt.verify(result, process.env.REFRESH_TOKEN_SECRET, async(err, user) => {
                    if (err) { return res.status(status.FORBIDDEN); }
                    const token = await hash.generateToken(user.first_name, user.email);
                    return res.status(status.OK).send({
                        token
                    });
                });
            }
        });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};
const activateUser = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.activateUser(email);
        mailing.welcomeMail(user.first_name, user.email);
        return user ?
            res.status(status.OK).send({
                message: 'Account activated'
            }) : res.status(status.BAD_REQUEST).send({ message: 'Error activating account' });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const confirmationToken = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.checkIfUserExist(email);
        const token = await hash.generateToken(user.first_name, user.email);
        mailing.verifyMail(user.email, user.first_name, token);
        return user ?
            res.status(status.CREATED).send({ message: 'sent' }) :
            res.status(status.BAD_REQUEST).send({ message: 'Error sending confirmation code' });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const forgetPassword = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.checkIfUserExist(email);
        if (user) {
            const token = await hash.generateToken(user.first_name, user.email);
            mailing.forgetPasswordMail(user.first_name, user.email, token);
            return res.status(status.OK).send({ message: 'reset link sent' });
        }
        return res.status(status.BAD_REQUEST).send({ message: 'user not found' });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const resetPassword = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.resetPassword(email, req.body);
        if (user) {
            mailing.resetSuccessful(user.first_name, user.email);
            return res.status(status.OK).send({ message: 'password reset successfully' });
        } return res.status(status.BAD_REQUEST).send({ message: 'Error resting password' });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

export default {
    createUsers,
    checkUser,
    userDetails,
    login,
    activateUser,
    confirmationToken,
    forgetPassword,
    resetPassword,
    refresh_token
};
