var Product = require('../models/product.model')

module.exports.get = async (req,res) => {
	
	var products = await Product.find();
	res.render('../views/product/product', {
		products : products
	})
}