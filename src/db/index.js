// eslint-disable-next-line import/no-cycle
import db from './setup/postgres';
import userQuery from './queries/users';

export {
    db,
    userQuery
};
