const User = require('../models/user.model')

module.exports.middleware = async (req, res, next) => {

	if(!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;
	}

	var user = await User.findById(req.signedCookies.userId)

	if(!user){
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user.name

	next();
}