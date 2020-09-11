
const shortid = require('shortid')
var db = require('../db')

module.exports.index = (req ,res) => {
	res.render('./user/user',
		{ users: db.get('users').value()
	})
}

module.exports.search = (req, res) => {
	var search = req.query.q;
	var userSearch = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(search.toLowerCase()) !==-1 })
	res.render('./user/search', {users: userSearch })
}

module.exports.get = (req, res) => {
	res.render('./user/creat_user')
}

module.exports.getUserById = (req,res) => {
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();
	res.render('user/view', { users: user})
}

module.exports.postCreateUser = (req,res) =>{
	
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write()
	res.redirect('/user')
}

