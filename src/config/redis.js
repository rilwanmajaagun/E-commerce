import redis from 'redis';
import logger from './logger';

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

client.on('error', (error) => {
    logger.error(error);
});

client.set('key', 'value', redis.print);
client.get('key', redis.print);

export default client;
