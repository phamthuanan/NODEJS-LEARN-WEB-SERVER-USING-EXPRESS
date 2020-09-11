var md5 = require('md5')
var db = require('../db')

module.exports.login = (req ,res) => {
	res.render('./auth/login')
}

module.exports.postLogin = (req,res) => {
	var email = req.body.email;
	var password = req.body.password;
	var user = db.get('users').find({email: email}).value();
	if(!user){
		res.render('./auth/login', {
			errors : ['User does not exist!'],
			values : req.body
		})
		return;
	}

	var passmd5 = md5(password)
	if(user.password !== passmd5){
		res.render('./auth/login', {
			errors :['Password is wrong!'],
			values : req.body
		})
		return;
	}

	res.cookie('userId', user.id,{
		signed: true
	});
	res.redirect('/user')
}