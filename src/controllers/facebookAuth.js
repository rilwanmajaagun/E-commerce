/* eslint-disable import/no-cycle */
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';
import strategy from 'passport-facebook';
import { db, userQuery } from '../db';
import { userService } from '../services';
import app from '../config/express';
import { userAuth } from '../middlewares';

const FacebookStrategy = strategy.Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'first_name', 'last_name', 'email']
},
    (async (accessToken, refreshToken, profile, cb) => {
        process.nextTick(async () => {
            try {
                const user = await userService.checkIfUserExist(profile.emails[0].value);
                if (user) {
                    return cb(null, user);
                }
                const id = uuidv4();
                const salt = process.env.SALT;
                const password = process.env.PASSWORD;
                const is_active = true;
                const payload = [id, profile.name.familyName, profile.name.givenName, profile.emails[0].value, password, salt, is_active];
                const newUser = await db.any(userQuery.createFaceBookUser, payload);
                return cb(null, newUser[0]);
            } catch (error) {
                return cb(error);
            }
        });
    })));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/failed'
}), (req, res) => {
    res.redirect('/success');
});

app.get('/success', async (req, res) => userAuth.socialMediaAuth(req, res));

app.get('/failed', (req, res) => {
    res.send('failed attempt');
});
