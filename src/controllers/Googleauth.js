/* eslint-disable import/no-cycle */
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';
import strategy from 'passport-google-oauth20';

import { db, userQuery } from '../db';
import { userService } from '../services';
import app from '../config/express';
import { userAuth } from '../middlewares';

const GoogleStrategy = strategy.Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
async(accessToken, refreshToken, profile, done) => {
    try {
        const user = await userService.checkIfUserExist(profile.emails[0].value);
        if (user) {
            done(null, user);
        } else {
            const id = uuidv4();
            const salt = process.env.SALT;
            const password = process.env.PASSWORD;
            const is_active = true;
            const payload = [id, profile.name.familyName, profile.name.givenName, profile.emails[0].value, password, salt, is_active];
            const newUser = await db.any(userQuery.createFaceBookUser, payload);
            return done(null, newUser[0]);
        }
    } catch (error) {
        done(error);
    }
}));
app.get('/google', passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: `http://${process.env.CLIENT_URL}/signup`
}), async(req, res) => {
    const token = await userAuth.socialMediaAuth(req);
    await userAuth.socialMediaRefresh_token(req);
    res.redirect(`http://${process.env.CLIENT_URL}?token=${token}`);
});
