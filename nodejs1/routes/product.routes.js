var express = require('express')
var product = require('../controller/product.controller')

var router = express.Router()

router.get('/', product.get)

module.exports = router