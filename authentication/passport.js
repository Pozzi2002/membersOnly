const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/pool');
const bcrypt = require('bcryptjs');

const strategy = new LocalStrategy(async (username, password, done) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = rows[0];
        const match = bcrypt.compare(password, user.password);
        if (!user) {
            return done(null, false, {message: 'Such username not found!'});
        }
        if (!match) {
            return done(null, false, {message: 'Password not correct!'})
        }
        return done(null, user)
    } catch(err) {
        return done(err)
    }
});

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      const user = rows[0];
      done(null, user);
    } catch(err){
        return done(err)
    };
});

passport.use(strategy);