var express = require('express')
const shortid = require('shortid')

var db = require('../db')

var router = express.Router()

router.get('/',(req ,res) =>{
	res.render('./user/user',
		{ users: db.get('users').value()})
})

router.get('/search', (req, res) => {
	var search = req.query.q;
	var userSearch = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(search.toLowerCase()) !==-1 })
	res.render('./user/user', {users: userSearch })
})

router.get('/create', (req, res) =>{
	res.render('./user/creat_user')
})

router.get('/:id', (req,res) =>{

	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();
	res.render('user/view', { users: user})
})

router.post('/create', (req,res) =>{
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write()
	res.redirect('/user')
})

module.exports = router