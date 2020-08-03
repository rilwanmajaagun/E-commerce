import config from './env';
import app from './express';
import logger from './logger';
import client from './redis';
// eslint-disable-next-line import/no-cycle
import userRouter from '../controllers/facebookAuth';
// eslint-disable-next-line import/no-cycle
import userRouters from '../controllers/Googleauth';
import mailing from './nodemailer';
import sendMailQueue from './bull';
import nexmo from './twoFactorauth';

export {
    config as default,
    app,
    logger,
    client,
    userRouter,
    userRouters,
    mailing,
    sendMailQueue,
    nexmo
};
