// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';
import { createUsers, checkUser } from '../controllers/userController';
import signupMiddleware from '../middlewares/userMiddlerware';

const router = new Router();

router.post('/signup', signupMiddleware.signupMiddleware, createUsers);
router.post('/check', checkUser);

export default router;
