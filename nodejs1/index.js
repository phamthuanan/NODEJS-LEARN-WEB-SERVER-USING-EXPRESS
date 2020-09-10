const express = require("express");
const bodyParser = require('body-parser')

const usersRoutes = require("./routes/users.routes")

const port = 3001;
const app = express();


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (req, res) => {
  res.render('index');
})

app.use('/user',usersRoutes )
app.listen(port, () => {console.log('Example app listening at http://localhost:' + port)});