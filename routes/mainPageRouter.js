const express = require('express');
const mainPageRouter = express.Router();
const mainPageConroller = require('../controllers/mainPageController')
const passport = require('passport')
const customNotFoundError = require('../customErrors/errors');

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

mainPageRouter.get('/becomeAdmin',mainPageConroller.testOnAuth, (req, res, next) => {
      res.locals.currentUser = req.user
      res.render('becomeAdmin')
});
mainPageRouter.post('/becomeAdmin', mainPageConroller.becomeAdminQuery);

mainPageRouter.get('/sendMsg', mainPageConroller.testOnAuth, (req, res) => {
    res.locals.currentUser = req.user
    res.render('sendMsg');
});
mainPageRouter.post('/sendMsg', mainPageConroller.postMessage)




module.exports = mainPageRouter;