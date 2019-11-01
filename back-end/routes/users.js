var express = require('express');
var router = express.Router();

let {register,hasAccount,login, isLogin,exit} = require('../controllers/users')


/* GET users listing. */
router.post('/register', hasAccount, register);
router.post('/login', login);
router.get('/isLogin',isLogin)
router.get('/exit',exit)
module.exports = router;
