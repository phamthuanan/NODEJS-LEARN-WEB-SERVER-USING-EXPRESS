var db = require("../db")

module.exports.addProduct = (req, res) => {

	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId

	if(!sessionId){
		res.redirect('/product')
		return;
	}

	var count = db.get('session').find({id: sessionId}).get('cart.'+productId, 0).value();
	db.get('session').find({id: sessionId})
		.set('cart.' + productId,count + 1)
		.write()

	var cart = db.get('session').find({id : sessionId}).get('cart').value();
	var quality = 0;
	for(var key in cart){
		quality += cart[key]
	}//  quality product in cart

	res.locals.quality = quality

	res.redirect('/product')
}