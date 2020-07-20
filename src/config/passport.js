/* eslint-disable import/no-cycle */
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';
import strategy from 'passport-facebook';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { db, userQuery } from '../db';
// import { hash } from '../utils';
import { userService } from '../services';

const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: false }));
const FacebookStrategy = strategy.Strategy;
userRouter.use(passport.initialize());
userRouter.use(passport.session());
userRouter.use(cookieParser());

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'first_name', 'last_name', 'email']
},
((accessToken, refreshToken, profile, cb) => {
    process.nextTick(async() => {
        try {
            const user = await userService.checkIfUserExist(profile.emails[0].value);
            if (user) {
                return cb(null, user);
            }
            const id = uuidv4();
            // saving default salt and password
            const salt = '$2b$10$wkKj6mJwpvXlPggUt9yi0u';
            const password = '$2b$10$wkKj6mJwpvXlPggUt9yi0u';
            const is_active = true;
            const payload = [id, profile.name.familyName, profile.name.givenName, profile.emails[0].value, password, salt, is_active];
            // await hash.generateToken(profile.name.familyName, profile.emails[0].value);
            const newUser = await db.any(userQuery.createFaceBookUser, payload);
            return cb(null, newUser[0]);
        } catch (error) {
            return cb(error);
        }
    });
})));

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async(email, done) => {
    const user = userService.checkIfUserExist(email);
    return done(null, user);
});

userRouter.get('/success', (req, res) => {
    // console.log(req.user);
    res.send('here');
});

userRouter.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
userRouter.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/success',
        failureRedirect: '/failed'
    }));
userRouter.get('/failed', (req, res) => {
    res.send('failed attempt');
});

export default userRouter;
