const { validationResult } = require('express-validator');
const { signUpValidator } = require('./validator');
const db = require('../db/queries');


exports.signUpQuery = [
    signUpValidator, 
    async (req, res) => {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).render('signUp.ejs', {
                title: 'Create user',
                errors: errors.array()
            })
        };
        const checkUsernameExist = await db.checkUsernameDB(req.body.nickname);
        if (checkUsernameExist) {
            return res.status(400).render('signUp.ejs', {
                errors: [{msg: 'Nickname already exist!'}]
            })
        };
        const { firstName, lastName, nickName, password } = req.body;
        await db.signUpQueryDB(firstName, lastName, nickName, password);
        res.redirect('/')
    }
];