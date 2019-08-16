//==================
//DEPENDENCIES
//===================
const morgan = require('morgan');
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require('express-session')
require('dotenv').config()
const app = express();
const db = mongoose.connection;

//====================
//PORT
//====================
const PORT = process.env.PORT || 3000;

//===================
//DATABASE
//===================
const PROJECT3_DB = process.env.PROJECT3_DB

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connect to Mongo
mongoose.connect(PROJECT3_DB ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', PROJECT3_DB));
db.on('disconnected', () => console.log('mongo disconnected'));

//==================
// MIDDLEWARE
//==================
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(session({
// 	secret: process.env.SECRET,
// 	resave: false,
// 	saveUninitialized: false
// }))
// app.use(methodOverride('_method'));
app.use(morgan('tiny'));

//====================
// ROUTES
//====================
// app.get('/login', (req, res) => {
//   res.render('login.ejs', {
// 	  currentUser: req.session.currentUser
//   })
// })

app.get('/', (req, res) => {
  res.render("index.html")
})

//==================
// CONTROLLERS
//==================
const userController = require('./controllers/users.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

const homesController = require('./controllers/homes.js')
app.use('/homes', homesController)

//==================
// LISTENER
//==================
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
