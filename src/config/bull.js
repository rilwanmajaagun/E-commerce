import 'dotenv/config';
import Queue from 'bull';
import logger from './logger';

const sendMailQueue = new Queue('sendMail', process.env.REDIS_URL);

sendMailQueue.on('completed', (job, result) => {
    logger.info(`Job completed with result ${result}`);
});

export default sendMailQueue;
