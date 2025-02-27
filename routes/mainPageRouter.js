const express = require('express');
const mainPageRouter = express.Router();
const mainPageConroller = require('../controllers/mainPageController')
const passport = require('passport')

mainPageRouter.get('/', mainPageConroller.handleMainPage);

mainPageRouter.get('/sign-up', (req, res) => res.render("signUp")
);
mainPageRouter.post('/sign-up', mainPageConroller.signUpQuery);

mainPageRouter.get('/log-in', (req, res) => {
    if (req.session.messages) {
        const error = req.session.messages[0];
        req.session.messages.splice(0);
        return res.status(400).render('logIn', {errors: [{msg: error}]});
    }
    res.render("logIn")
});

mainPageRouter.post('/log-in', mainPageConroller.logInQuery, passport.authenticate('local', {successRedirect: '/', failureRedirect: '/log-in', failureMessage: 'Not such username or password!'}));

mainPageRouter.get('/log-out', (req, res) => {
    req.logout()
        // res.locals.currentUser = req.user
        res.redirect('/')
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

mainPageRouter.post('/sendMsg', mainPageConroller.testOnAuth, mainPageConroller.postMessage);

mainPageRouter.post('/deleteMsg', mainPageConroller.deleteMsg);

module.exports = mainPageRouter;