const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

passport.use(
    new LocalStrategy(
        { usernameField: 'email' },  // Use email instead of username
        async (email, password, done) => {
            try {
                console.log("Passport Local Strategy Initiated for:", email);
                const user = await User.findOne({ email });

                if (!user) {
                    console.error("User Not Found:", email);
                    return done(null, false, { message: 'Incorrect email.' });
                }

                if (!user.validPassword(password)) {
                    console.error("Invalid Password for:", email);
                    return done(null, false, { message: 'Incorrect password.' });
                }

                console.log("Authentication Successful for:", email);
                return done(null, user);
            } catch (err) {
                console.error("Passport Strategy Error:", err);
                return done(err);
            }
        }
    )
);
