var express = require('express')
var authLogin = require('../controller/auth.login.controller')

var router = express.Router()

router.get('/login', authLogin.login)
router.post('/login', authLogin.postLogin)


module.exports = router