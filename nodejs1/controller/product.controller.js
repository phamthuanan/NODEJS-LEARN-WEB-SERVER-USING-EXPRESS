var db = require('../db')

module.exports.get = (req,res) => {
	var page = req.query.page || 1;
	var perpage = 8;
	var begin = (page - 1 ) * perpage;
	var end = page * perpage;
	res.render('../views/product/product', {
		products : db.get('products').slice(begin,end).value()
	})
}