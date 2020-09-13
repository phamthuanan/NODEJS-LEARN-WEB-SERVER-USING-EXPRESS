var express = require('express')
var userController = require('../controller/user.controller')
var validateUser = require('../validate/validateCreateUser')
var multer  = require('multer')

var upload = multer({ dest: './public/uploads/' })
var router = express.Router()

router.get('/', userController.index)

router.get('/search', userController.search)

router.get('/cookie', userController.cookie)

router.get('/create', userController.get)

router.get('/:id', userController.getUserById)

router.post('/create', upload.single('avatar'), validateUser.validate, userController.postCreateUser)


module.exports = router