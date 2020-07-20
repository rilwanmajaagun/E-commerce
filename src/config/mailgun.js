import 'dotenv/config';
import logger from './logger';

const apiKey = process.env.API_KEY;
const domain = process.env.DOMIAN;
const mailgun = require('mailgun-js')({ apiKey, domain });

const verifyMail = (name, email, token) => {
    const data = {
        from: 'E-commerce <majaagunoyinkolade@gmail.com>',
        to: `${email}`,
        subject: `Hi ${name} please verify your E-commerce account`,
        text: `Hi,Thanks for using E-commerce! Please confirm your email address by clicking on the link below.
        We'll communicate with you from time to time via email so it's important that we have an up-to-date 
        email address on file. http://localhost:3000/api/v1/auth/confrimation?token=${token}`
    };

    return mailgun.messages().send(data, (error, body) => {
        logger.info(body);
    });
};

const welcomeMail = (name, email) => {
    const data = {
        from: 'E-commerce <majaagunoyinkolade@gmail.com>',
        to: `${email}`,
        subject: `Welcome ${name}`,
        text: `Hi ${name} Your account has been activated`
    };

    return mailgun.messages().send(data, (error, body) => {
        logger.info(body);
    });
};

const resetPassword = (name, email, token) => {
    const data = {
        from: 'E-commerce <majaagunoyinkolade@gmail.com>',
        to: `${email}`,
        subject: `Hi ${name} Rest your Password`,
        text: `Hi, Rest your password using this link http://localhost:3000/api/v1/auth/reset-password?token=${token}`
    };

    return mailgun.messages().send(data, (error, body) => {
        logger.info(body);
    });
};

const resetSuccessful = (name, email) => {
    const data = {
        from: 'E-commerce <majaagunoyinkolade@gmail.com>',
        to: `${email}`,
        subject: `Hi ${name}`,
        text: 'Hi, Rest your password has been Reset successfully'
    };
    return mailgun.messages().send(data, (error, body) => {
        logger.info(body);
    });
};

export default {
    verifyMail,
    welcomeMail,
    resetPassword,
    resetSuccessful
};
