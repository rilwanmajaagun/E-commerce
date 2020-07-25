// eslint-disable-next-line import/no-cycle
import db from './setup/postgres';
import userQuery from './queries/users';
import categoryQuery from './queries/category';
import productQuery from './queries/product';
import ordersQuery from './queries/ordersQuery';

export {
    db,
    userQuery,
    categoryQuery,
    productQuery,
    ordersQuery
};
