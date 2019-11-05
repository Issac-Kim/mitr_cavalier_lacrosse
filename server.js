// Server init and requirements
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const dotenv = require('dotenv');

//My Routes
const authRoute = require('./routes/auth');

//Setup enviroment variables
dotenv.config();

//Database connect 
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true },
  () => console.log('DB connection succesful')
);
 
app.use(express.json());
app.use('/api/user', authRoute);



app.use(express.static(__dirname));
// Server route handler
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Start server
http.listen(3000, function() {
  console.log("Server running on port 3000");
});