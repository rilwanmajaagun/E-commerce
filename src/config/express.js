// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async(user, done) => done(null, user));

export default app;
