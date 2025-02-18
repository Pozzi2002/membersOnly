const express = require('express');
const mainPageRouter = express.Router();

mainPageRouter.get('/', (req, res) => res.render('mainPage'));

mainPageRouter.get('/sign-up', (req, res) => res.render("signUp"));

module.exports = mainPageRouter;