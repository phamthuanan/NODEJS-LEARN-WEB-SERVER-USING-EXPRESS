var md5 = require('md5')
var User = require('../models/user.model')

module.exports.login = (req ,res) => {
	res.render('./auth/login')
}

module.exports.postLogin = async (req,res) => {
	var email = req.body.email;
	var password = req.body.password;
	var user = await User.find({email: email})
	if(!user){
		res.render('./auth/login', {
			errors : ['User does not exist!'],
			values : req.body
		})
		return;
	}
	var passmd5 = md5(password)
	var userpassword = user[0].password;
	if(userpassword !== passmd5){
		res.render('./auth/login', {
			errors :['Password is wrong!'],
			values : req.body
		})
		return;
	}

	res.cookie('userId', user[0].id,{
		signed: true
	});
	res.redirect('/user')
}