var express = require('express')
var cartController = require('../controller/cart.controller')
var router = express.Router()

router.get('/add/:productId' , cartController.addProduct)


module.exports = router