import config from './env';
import app from './express';
import logger from './logger';
import client from './redis';
// eslint-disable-next-line import/no-cycle
import userRouter from './passport';
import sendMail from './mailgun';
// eslint-disable-next-line import/no-cycle
import userRouters from './Googleauth';

export {
    config as default,
    app,
    logger,
    client,
    userRouter,
    sendMail,
    userRouters
};
