/* eslint-disable no-undef */
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import request from 'supertest';
import chai from 'chai';
// import nock from 'nock';
import app from '../src/index';
import { logger } from '../src/config';

const { expect } = chai;
describe('e-commerce', () => {
    let user,
        token,
        category,
        new_name,
        id,
        order_id,
        wishList_id,
        cart,
        cart_id,
        address_id,
        transaction_id;
    const product_name = faker.commerce.productName();
    before((done) => {
        user = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(8),
            phone_number: faker.random.number(110000000000)
        };
        request(app)
            .post('/api/v1/auth/register')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                token = res.body.data.token;
                if (err) { return done(err); }
                expect(res.body.message).to.equal('user created Successfully');
                request(app)
                    .get(`/api/v1/auth/confirmation?token=${token}`)
                    .send(user)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) { throw err; }
                        expect(res.body.message).to.equal('Account activated');
                        request(app)
                            .post('/api/v1/auth/confirmation')
                            .send({ email: user.email })
                            .expect('Content-Type', /json/)
                            .expect(400)
                            .end((err, res) => {
                                if (err) { return done(err); }
                                expect(res.body.message).to.equal('Account is verified');
                                done();
                            });
                    });
            });
    });
    describe('login', () => {
        it('it should get the base url', (done) => {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal(undefined);
                });
            done();
        });
        it('first name is required', (done) => {
            request(app)
                .post('/api/v1/auth/register')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('first_name is required');
                    done();
                });
        });
        it('should return login successful', (done) => {
            request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: user.email,
                    password: user.password
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('login successful');
                    done();
                });
        });
    });
    describe('category', () => {
        it('should create category', (done) => {
            request(app)
                .post('/api/v1/category')
                .set({ token: process.env.ADMIN_TOKEN })
                .send({
                    name: faker.random.word()
                })
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    category = res.body.data.name;
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('category created successfully');
                    done();
                });
        });
        it('should return all category', (done) => {
            request(app)
                .get('/api/v1/category')
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    logger.info(res.body.message);
                    done();
                });
        });
        it('should update category', (done) => {
            new_name = faker.random.word();
            request(app)
                .put('/api/v1/category')
                .set({ token: process.env.ADMIN_TOKEN })
                .set('Accept', 'application')
                .send({
                    name: category,
                    new_name
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal(`${new_name} updated Successfully`);
                    done();
                });
        });
    });
    describe('product', () => {
        it('should create product', (done) => {
            request(app)
                .post('/api/v1/product')
                .set({ token: process.env.ADMIN_TOKEN })
                .field({
                    product_name,
                    category: new_name,
                    quantity: 10,
                    price: 200
                })
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    id = res.body.data.id;
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('product Added Successfully');
                    done();
                });
        });
        it('should return all product', (done) => {
            request(app)
                .get('/api/v1/product')
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('successfully fetched all product');
                    done();
                });
        });
        it('should return No Product found by specific category', (done) => {
            request(app)
                .post('/api/v1/select/product/category')
                .set('Accept', 'application')
                .send({ category })
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('No Product found');
                    done();
                });
        });
        it('should return Product found by specific category', (done) => {
            request(app)
                .post('/api/v1/select/product/category')
                .set('Accept', 'application')
                .send({ category: 'Pet Supplies' })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('Product found');
                    done();
                });
        });
        it('should return specific Product', (done) => {
            request(app)
                .post('/api/v1/search/product')
                .set('Accept', 'application')
                .send({ product_name: 'ch' })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('Product found');
                    done();
                });
        });
        it('should return all Product by category', (done) => {
            request(app)
                .get('/api/v1/product/category')
                .set('Accept', 'application')
                .send({ category: 'Pet Supplies' })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    logger.info(res.body.message);
                    done();
                });
        });
        it('should update product', (done) => {
            request(app)
                .put('/api/v1/product')
                .set({ token: process.env.ADMIN_TOKEN })
                .set('Accept', 'application')
                .send({
                    id,
                    category: new_name,
                    quantity: '20'
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('product updated Successfully');
                    done();
                });
        });
    });
    describe('password', () => {
        it('Forget Password', (done) => {
            request(app)
                .post('/api/v1/auth/forgot-password')
                .send({ email: user.email })
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('reset link sent');
                    done();
                });
        });
        it('should Reset Password', (done) => {
            request(app)
                .post(`/api/v1/auth/reset-password?token=${token}`)
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .send({ password: faker.random.alphaNumeric(8) })
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('password reset successfully');
                    done();
                });
        });
    });
    describe('wishList', () => {
        it('create wishList', (done) => {
            request(app)
                .post('/api/v1/wishlist')
                .set({ token })
                .send({
                    product_id: '6e440d26-c5a9-401d-970e-9a213efba929'
                })
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('product added successfully');
                    done();
                });
        });
        it('get wishList', (done) => {
            request(app)
                .get('/api/v1/wishlist')
                .set({ token })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    wishList_id = res.body.wishList[0].id;
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('Wish List fetched successfully');
                    done();
                });
        });
    });
    describe('address', () => {
        it('create address', (done) => {
            request(app)
                .post('/api/v1/address')
                .set({ token })
                .send({
                    first_name: faker.name.findName(),
                    last_name: faker.name.lastName(),
                    mobile_number: faker.random.number(110000000000),
                    additional_mobile_number: '',
                    address: faker.address.streetAddress(),
                    state_region: faker.address.state(),
                    city: faker.address.city()
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('Address Added successfully');
                    done();
                });
        });
        it('get address', (done) => {
            request(app)
                .get('/api/v1/address')
                .set({ token })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    address_id = res.body.data[0].id;
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('Address fetched successfully');
                    done();
                });
        });
        it('update address', (done) => {
            request(app)
                .put('/api/v1/address')
                .set({ token })
                .send({
                    id: address_id,
                    first_name: faker.name.findName(),
                    last_name: faker.name.lastName(),
                    mobile_number: faker.random.number(110000000000),
                    additional_mobile_number: '',
                    address: faker.address.streetAddress(),
                    state_region: faker.address.state(),
                    city: faker.address.city()
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('Address updated successfully');
                    done();
                });
        });
        it('set as address default', (done) => {
            request(app)
                .patch('/api/v1/address')
                .set({ token })
                .send({
                    id: address_id
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('Address set as default successfully');
                    done();
                });
        });
    });
    describe('cart', () => {
        it('add to cart', (done) => {
            request(app)
                .post('/api/v1/cart')
                .set({ token })
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .send({
                    product_id: id,
                    order_id: uuidv4()
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('product added successfully');
                    done();
                });
        });
        it('get cart', (done) => {
            request(app)
                .get('/api/v1/cart')
                .set({ token })
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    cart = res.body.cart;
                    cart_id = res.body.cart[0].id;
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('Cart fetched successfully');
                    done();
                });
        });
        it('update cart', (done) => {
            request(app)
                .patch('/api/v1/cart')
                .set({ token })
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .send({
                    id: cart_id,
                    quantity: 10
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('cart updated successfully');
                    done();
                });
        });
        it('move wish list to cart', (done) => {
            request(app)
                .post('/api/v1/cart/wishlist')
                .set({ token })
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .send({
                    id: wishList_id
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('Product added to cart successfully');
                    done();
                });
        });
    });
    describe('order', () => {
        it('create order', (done) => {
            request(app)
                .post('/api/v1/order')
                .set({ token })
                .send(
                    cart
                )
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    transaction_id = res.body.transaction_id;
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('your order as been placed');
                    done();
                });
        });
        it('get subTotal', (done) => {
            request(app)
                .get(`/api/v1/subTotal/${transaction_id}`)
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('YOur ');
                    done();
                });
        });
        it.skip('cancel order', (done) => {
            request(app)
                .patch('/api/v1/cancelOrder')
                .set({ token })
                .set('Accept', 'application')
                .expect('Content-Type', /json/)
                .send({ id: order_id })
                .expect(200)
                .end((err, res) => {
                    if (err) { throw err; }
                    expect(res.body.message).to.equal('your order has been cancelled');
                    done();
                });
        });
    });
    after((done) => {
        request(app)
            .delete(`/api/v1/cart/${cart_id}`)
            .set({ token })
            .set('Accept', 'application')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) { throw err; }
                expect(res.body.message).to.equal('Product deleted successfully ');
                request(app)
                    .delete(`/api/v1/cart/${wishList_id}`)
                    .set({ token })
                    .set('Accept', 'application')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) { throw err; }
                        expect(res.body.message).to.equal('Product deleted successfully ');
                        request(app)
                            .delete(`/api/v1/wishlist/${wishList_id}`)
                            .set({ token })
                            .set('Accept', 'application')
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .end((err, res) => {
                                if (err) { throw err; }
                                expect(res.body.message).to.equal('Product deleted successfully ');
                                request(app)
                                    .delete('/api/v1/product')
                                    .set({ token: process.env.ADMIN_TOKEN })
                                    .set('Accept', 'application')
                                    .send({ product_name: 'Chain' })
                                    .expect('Content-Type', /json/)
                                    .expect(200)
                                    .end((err, res) => {
                                        if (err) { throw err; }
                                        expect(res.body.message).to.equal('Chain Deleted successfully');
                                        request(app)
                                            .delete('/api/v1/category')
                                            .set({ token: process.env.ADMIN_TOKEN })
                                            .set('Accept', 'application')
                                            .send({ name: 'Pet Supplies' })
                                            .expect('Content-Type', /json/)
                                            .expect(200)
                                            .end((err, res) => {
                                                if (err) { throw err; }
                                                expect(res.body.message).to.equal('Pet Supplies Deleted successfully');
                                                request(app)
                                                    .delete(`/api/v1/address/${address_id}`)
                                                    .set({ token })
                                                    .set('Accept', 'application')
                                                    .send({ name: 'Pet Supplies' })
                                                    .expect('Content-Type', /json/)
                                                    .expect(200)
                                                    .end((err, res) => {
                                                        if (err) { throw err; }
                                                        expect(res.body.message).to.equal('Address deleted successfully ');
                                                        done();
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });
});
