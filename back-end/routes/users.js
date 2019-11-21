var express = require('express');
let upload = require('../middlewares/upload')

var router = express.Router();

let {register,hasAccount,login, isLogin,exit,findOne,update} = require('../controllers/users')


/* GET users listing. */
router.post('/register', hasAccount, register);
router.post('/login', login);
router.get('/isLogin',isLogin)
router.get('/exit',exit)
router.get('/updateUser',findOne)
router.patch('/update',upload,update)
module.exports = router;
