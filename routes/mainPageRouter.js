const express = require('express');
const mainPageRouter = express.Router();
const mainPageConroller = require('../controllers/mainPageController')
const passport = require('passport')

mainPageRouter.get('/', (req, res) => {
    res.locals.currentUser = req.user
    res.render('mainPage')
});

mainPageRouter.get('/sign-up', (req, res) => res.render("signUp"));
mainPageRouter.post('/sign-up', mainPageConroller.signUpQuery);

mainPageRouter.get('/log-in', (req, res) => res.render("logIn"));
mainPageRouter.post('/log-in', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/sign-up'}));

mainPageRouter.get('/log-out', (req, res ) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        } 
        res.redirect('/')
    })
})
module.exports = mainPageRouter;