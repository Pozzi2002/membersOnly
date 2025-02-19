/*Imports*/
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const mainPageRouter = require('./routes/mainPageRouter');
const passport = require('passport');
require('dotenv').config();
require('./authentication/passport');
/*Pre configure*/
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'sex',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(passport.session())

/*Routes*/
app.use(mainPageRouter);





/*Simple configure */
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
