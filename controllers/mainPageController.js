const { validationResult } = require('express-validator');
const { signUpValidator, checkMessage, logInValidator } = require('./validator');
const customNotFoundError = require('../customErrors/errors');
const passport = require('passport')
require('dotenv').config();
const db = require('../db/queries');


exports.signUpQuery = [
    signUpValidator, 
    async (req, res) => {   
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('signUp.ejs', {
                title: 'Create user',
                errors: errors.array()
            })
        };
        const checkUsernameExist = await db.checkUsernameDB(req.body.nickName);
        console.log(checkUsernameExist)
        if (checkUsernameExist.length > 0) {
            return res.status(400).render('signUp', {
                errors: [{msg: 'Nickname already exist!'}]
            })
        };
        const { firstName, lastName, nickName, password } = req.body;
        await db.signUpQueryDB(firstName, lastName, nickName, password);
        res.redirect('/log-in');
    }
];

exports.logInQuery = [
  logInValidator,
  async (req, res, next) => {
    console.log(req.body.password)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('logIn', {
        title: 'Login user',
        errors: errors.array()
      })
    };
    next()
  }
]


exports.becomeAdminQuery = async (req, res) => {
  if (req.body.secretPassword === process.env.SECRET) {
    await db.makeAnAdmin(req.user.nickname)
    res.redirect('/')
  } else {
    res.locals.currentUser = req.user
    return res.status(400).render('becomeAdmin', {
        errors: [{msg: 'Incorrect password'}]
    })
  }
};

exports.postMessage = [
    checkMessage,
    async (req, res) => {
        await db.addMessage(req.body.message, req.user.nickname);
        res.redirect('/');
    }
]

exports.testOnAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new customNotFoundError('You not authorize!');
  };
  next();
};