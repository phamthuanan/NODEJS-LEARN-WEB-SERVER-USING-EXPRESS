const express = require("express");
const bodyParser = require('body-parser')
const low = require('lowdb')

const port = 3001;
const app = express();

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)



db.defaults({ users: []})
  .write()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (req, res) => {
  res.render('index');
})

app.get('/user',(req ,res) =>{
	res.render('./user/user',
		{ users: db.get('users').value()})
})

app.get('/user/search', (req, res) => {
	var search = req.query.q;
	var userSearch = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(search.toLowerCase()) !==-1 })
	res.render('./user/user', {users: userSearch })
})

app.get('/user/create', (req, res) =>{
	res.render('./user/creat_user')
})

app.post('/user/create', (req,res) =>{
	db.get('users').push(req.body).write()
	res.redirect('/user')
})
app.listen(port, () => {console.log('Example app listening at http://localhost:' + port)});