const { body } = require('express-validator');

exports.signUpValidator = [
    body('firstName').trim()
      .notEmpty().withMessage('First name not should be empty')
      .isAlpha().withMessage('First name should be only letters')
      .isLength({min: 1, max: 20}).withMessage('Should be minimum 1 character and maximum 20')
      .escape(),
    body('lastName').trim()
      .notEmpty().withMessage('Last name not should be empty')
      .isAlpha().withMessage('Last name should be only letters')
      .isLength({min: 1, max: 20}).withMessage('Should be minimum 1 character and maximum 20')
      .escape(),
    body('nickName').trim()
      .notEmpty().withMessage('Nickname not should be empty')
      .isAlphanumeric().withMessage('Nickname should be alphanumeric')
      .isLength({min: 1, max: 20}).withMessage('Should be minimum 1 character and maximum 20')
      .escape(),
    body('password')
      .notEmpty().withMessage('Password not should be empty')
      .isLength({min: 1, max: 25}).withMessage('Should be minimum 1 character and maximum 25'),
    body('confPassword')
      .notEmpty().withMessage('Password not should be empty')
      .isLength({min: 1, max: 25}).withMessage('Should be minimum 1 character and maximum 25')
      .custom((value, {req}) => value === req.body.password).withMessage('The passwords should be identical')
];

exports.checkMessage = [
  body('message').trim()
  .notEmpty().withMessage("Shouldn't be empty")
  .isLength({min: 1, max: 150}).withMessage('Should be minimum 1 character and maximum 150')
  .escape()
]
