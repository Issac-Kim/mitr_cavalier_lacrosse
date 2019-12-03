// Server init and requirements
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('req-flash');

//My Routes
const userRoute = require('./routes/userRoute');
const teamRoute = require('./routes/teamRoute');
const playerRoute = require('./routes/createPlayer');
const adminRoute = require('./routes/adminRoute')
//const photoRoute = require('./routes/uploadPhoto');

//Setup enviroment variables
dotenv.config();

//View engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: null}));
app.set('view engine', 'hbs');

//Database connect 
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true },
  () => console.log('DB connection succesful')
);
 
//Setup body parsing
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Session Setup
app.use(cookieParser());
app.use(session({
    secret: process.env.COOKIE_TOKEN,
    maxAge: 4000000,
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

app.use('/api/user', userRoute);
app.use('/api/team', teamRoute)
app.use('/api/player', playerRoute);
app.use('/admin', adminRoute);
//app.use('/api/photo', photoRoute);

app.use(express.static(__dirname));


// Home view
app.get('/', function (req, res) {
  res.render('index', {});
});


// Start server
http.listen(3000, function() {
  console.log("Server running on port 3000");
});