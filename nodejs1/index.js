const express = require("express");
const app = express();

const port = 3001;


app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (req, res) => {
  res.render('index');
})

app.get('/user',(req ,res) =>{
	res.render('./user/user',
		{
			users: [{id: 1, name: 'Thuan An'},
					{id: 2, name: 'Hung Si'},
					{id: 3, name: 'Thai Bao'}]
		}
		)
})

app.listen(port, () => {console.log('Example app listening at http://localhost:' + port)});