const express = require("express");
const bodyParser = require('body-parser')
const app = express();


const port = 3001;

var users = [{id: 1, name: 'Thuan An'},
			{id: 2, name: 'Hung Si'},
			{id: 3, name: 'Thai Bao'}]

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (req, res) => {
  res.render('index');
})

app.get('/user',(req ,res) =>{
	res.render('./user/user',
		{ users: users })
})

app.get('/user/search', (req, res) => {
	var search = req.query.q;
	var userSearch = users.filter(function(user){
		return user.name.toLowerCase().indexOf(search.toLowerCase()) !==-1 })
	res.render('./user/user', {users: userSearch, search: req.query.q })
})

app.get('/user/create', (req, res) =>{
	res.render('./user/creat_user')
})

app.post('/user/create', (req,res) =>{
	users.push(req.body)
	res.redirect('/user')
})
app.listen(port, () => {console.log('Example app listening at http://localhost:' + port)});