const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
	_id: String,
	cart: Object
})

var Session = mongoose.model('Session', sessionSchema, 'session');

module.exports = Session;