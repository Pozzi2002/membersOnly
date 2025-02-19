const { validationResult } = require('express-validator');
const { signUpValidator } = require('./validator');
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
            return res.status(400).render('signUp.ejs', {
                errors: [{msg: 'Nickname already exist!'}]
            })
        };
        const { firstName, lastName, nickName, password } = req.body;
        await db.signUpQueryDB(firstName, lastName, nickName, password);
        res.redirect('/log-in');
    }
];

exports.becomeAdminQuery = async (req, res) => {
  if (req.body.secretPassword === process.env.SECRET) {
    await db.makeAnAdmin(req.user.nickName)
    res.redirect('/becomeAdmin')
  } 
};