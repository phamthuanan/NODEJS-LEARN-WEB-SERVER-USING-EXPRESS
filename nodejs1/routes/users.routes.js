var express = require('express')
var userController = require('../controller/user.controller')
var validateUser = require('../validate/validateCreateUser')

var router = express.Router()

router.get('/', userController.index)

router.get('/search', userController.search)

router.get('/create', userController.get)

router.get('/:id', userController.getUserById)

router.post('/create', validateUser.validate, userController.postCreateUser)


module.exports = router