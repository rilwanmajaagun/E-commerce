import development from './development';
import production from './production';
import test from './test';

const {
    ECOMMERCE_NODE_ENV: NODE_ENV
} = process.env;

export default {
    development,
    test,
    production
}[NODE_ENV || 'production'];
