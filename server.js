// Server init and requirements
const express = require("express");
const app = express();
const http = require("http").Server(app);
 
app.use(express.static(__dirname));
 
// Server route handler
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
 
// Start server
http.listen(3000, function() {
  console.log("Server running on port 3000");
});