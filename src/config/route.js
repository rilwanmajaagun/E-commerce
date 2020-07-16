// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';
import { createUsers, checkUser, login } from '../controllers/userController';
import userMiddlerware from '../middlewares/userMiddlerware';

const router = new Router();

router.post('/auth/signup', userMiddlerware.signupMiddleware, createUsers);
router.post('/check', checkUser);
router.post('/auth/login', userMiddlerware.loginMiddleware, login);

export default router;
