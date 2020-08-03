/* eslint-disable import/no-cycle */
import status from 'http-status';
import { nexmo } from '../config';
import { userService } from '../services';

const sendCode = async(req, res) => {
    const { email } = req.body;
    const user = await userService.checkIfUserExist(email);
    const Number = user.phone_number.slice(1);
    nexmo.verify.request({
        number: `234${Number}`,
        brand: 'Ecommerce',
        code_length: '4'
    }, (error, ressult) => {
        if (ressult.status !== 0) {
            res.status(status.OK).send({
                message: 'successful',
                request_id: ressult.request_id
            });
        } else {
            res.status(status.BAD_REQUEST).send({
                message: 'Error sending verification code'
            });
        }
    });
};

const checkCode = async(req, res) => {
    const { request_id, code } = req.body;
    nexmo.verify.check({
        request_id,
        code
    }, (error, result) => {
        if (result.status === '0') {
            return res.status(status.OK).send({
                message: 'successful'
            });
        }
        return res.status(status.BAD_REQUEST).send({
            message: 'Error verifiying code'
        });
    });
};
export default {
    sendCode,
    checkCode
};
