import status from 'http-status';
import { userService } from '../services';
import { hash } from '../utils';
import { sendMail } from '../config';

const createUsers = async(req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        const token = await hash.generateToken(newUser[0].first_name, newUser[0].email);
        sendMail.verifyMail(newUser[0].first_name, newUser[0].email, token);
        return newUser ?
            res.status(status.CREATED).send({
                message: 'user created sucessfully',
                data: {
                    id: newUser[0].id,
                    email: newUser[0].email,
                    date_created: newUser[0].created_at
                }
            }) :
            res.status(status.BAD_REQUEST).send({
                message: 'error creating user',
                data: null
            });
    } catch (e) {
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

const login = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.checkIfUserExist(email);
        const token = await hash.generateToken(user.first_name, user.email);
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

const activateUser = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.activateUser(email);
        sendMail.welcomeMail(user.first_name, user.email);
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

const confrimationToken = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.checkIfUserExist(email);
        const token = await hash.generateToken(user.first_name, user.email);
        sendMail.verifyMail(user.first_name, user.email, token);
        return user ?
            res.status(status.CREATED).send({ message: 'sent' }) :
            res.status(status.BAD_REQUEST).send({ message: 'Error sending confrimation code' });
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
            sendMail.resetPassword(user.first_name, user.email, token);
            return res.status(status.OK).send({ message: 'rest link send' });
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
            sendMail.resetSuccessful(user.first_name, user.email);
            return res.status(status.OK).send({ message: 'password reset successfully' });
        } return res.status(status.BAD_REQUEST).send({ message: 'Error reseting password' });
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
    login,
    activateUser,
    confrimationToken,
    forgetPassword,
    resetPassword
};
