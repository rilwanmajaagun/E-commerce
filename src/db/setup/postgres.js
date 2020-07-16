import 'dotenv/config';
import promise from 'bluebird';
import pg from 'pg-promise';
// eslint-disable-next-line import/no-cycle
import config from '../../config';

const options = {
    promiseLib: promise
};

const pgp = pg(options);
const db = pgp(config.DATABASE_URL);

export default db;
