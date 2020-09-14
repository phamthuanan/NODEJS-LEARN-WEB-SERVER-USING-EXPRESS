require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-demo', {useNewUrlParser: true});

const usersRoutes = require("./routes/users.routes")
const authenLogin = require('./routes/auth.routes')
const middleware = require('./middleware/middleware')
const product = require('./routes/product.routes')
const session = require('./middleware/session.middleware')
const cart = require('./routes/cart.routes')
const port = 3001;
const app = express();


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session)

app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (req, res) => {
  res.render('index');
})

app.use(express.static('public'))

app.use('/user',middleware.middleware,usersRoutes )
app.use('/auth', authenLogin)
app.use('/product', product)
app.use('/cart', cart)

app.listen(port, () => {console.log('Example app listening at http://localhost:' + port)});