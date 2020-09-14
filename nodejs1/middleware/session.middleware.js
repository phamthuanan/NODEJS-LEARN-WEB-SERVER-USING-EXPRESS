const shortid = require('shortid')
var Session = require('../models/session.model')

module.exports = (req, res, next) =>{

	if(!req.signedCookies.sessionId){
		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId,{
		signed: true
		});

		var session = new Session({
			_id: sessionId
		})

		session.save(function (err) {
	  		if (err) return handleError(err);
		});
	}
	
	next()
}