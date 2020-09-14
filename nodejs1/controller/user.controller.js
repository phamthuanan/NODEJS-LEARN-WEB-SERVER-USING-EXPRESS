
const shortid = require('shortid')
const User = require('../models/user.model')

module.exports.index = async (req ,res) => {

	var users = await User.find()
	res.render('./user/user',
		{ 
			users: users
	})
}

module.exports.search = async (req, res) => {
	var search = req.query.q;
	var userSearch = await User.find({$or : [{ name : {'$regex': search.toUpperCase()}}, { name : {'$regex': search.toLowerCase()}}]})
	res.render('./user/search', {users: userSearch })
}

module.exports.get = (req, res) => {
	console.log(req.cookies)
	res.render('./user/creat_user')
}

module.exports.getUserById = async (req,res) => {
	var id = req.params.id;
	var user = await User.findById(id)
	res.render('user/view', { users: user})
}

module.exports.postCreateUser = (req,res) =>{

	var avatar = 'uploads/' + req.file.filename
	var user = new User({ name: req.body.name, phone: req.body.phone, avatar: avatar });
	user.save(function (err) {
	  if (err) return handleError(err);
	});
	
	res.redirect('/user')
}

module.exports.cookie = (req,res) => {
	res.cookie('user-id', 123)
	res.send('Hello')
}

