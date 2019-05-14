const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

require('dotenv').config();


/* View Engine + Static Resource Routes */
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());

require('./data/database');

app.use(require('./middleware/auth'));
app.use(require('./controllers/users'));

const { users } = require('./data/mock');

app.get('/', (_, res) => res.render('index', { users }));

app.listen(5000, () => console.log('Running on 0.0.0.0:5000'));


module.exports = app;
