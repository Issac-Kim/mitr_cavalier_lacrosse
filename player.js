// Server & app requirements
const express = require("express");
const bodyParser = require("body-parser");
const assert = require("assert");
const app = express();
const http = require("http").Server(app);

//connect to database
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:cavalier@cluster0-iwimf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
 
// Server route handler
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

//get player input form data
app.post('/sign_up', function(req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let team = req.body.team;

  let playerData = {
    "name": name, 
    "email": email,
    "phone": phone,
    "team": team
  }

  client.connect(err => {
    assert.equal(null, err);
    const collection = client.db("test").collection("players");
   
    console.log("Connected successfully to server");
    collection.insertOne(playerData, function(err, result){
      console.log("Inserted player into database!");
    });
    client.close();
  });

  return res.redirect('index.html');
});
 
// Start server
http.listen(3000, function() {
  console.log("Server running on port 3000");
});


