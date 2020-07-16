import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';
import strategy from 'passport-facebook';
import session from 'express-session';
import express from 'express';
import bodyParser from 'body-parser';
// eslint-disable-next-line import/no-cycle
import { db, userQuery } from '../db';
import logger from './logger';
import { hash } from '../utils';

const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: false }));

const FacebookStrategy = strategy.Strategy;
userRouter.use(passport.initialize());
userRouter.use(passport.session());
userRouter.use(session({ secret: 'jbfjvbjbfvjb' }));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'first_name', 'last_name', 'email']
},
((accessToken, refreshToken, profile, cb) => {
    (async(error) => {
        const id = uuidv4();
        // saving default salt and password
        const salt = '$2b$10$wkKj6mJwpvXlPggUt9yi0u';
        const password = '$2b$10$wkKj6mJwpvXlPggUt9yi0u';
        const is_active = true;
        const payload = [id, profile.name.familyName, profile.name.givenName, profile.emails[0].value, password, salt, is_active];
        await hash.generateToken(profile.name.familyName, profile.emails[0].value);
        const user = await db.manyOrNone(userQuery.getUser, profile.emails[0].value);
        if (user.length > 0) {
            logger.info('user already exist');
            return cb(error, user);
        }
        logger.info('creating new user');
        return cb(error, db.any(userQuery.createFaceBookUser, payload));
    })();
})));
userRouter.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
userRouter.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/success',
        failureRedirect: '/failed'
    }));
userRouter.get('/failed', (req, res) => {
    res.send('failed attempt');
});
userRouter.get('/success', (req, res) => {
    res.send('success');
});
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((id, done) => done(null, id));

export default userRouter;
