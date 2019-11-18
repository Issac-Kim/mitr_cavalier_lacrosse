const router = require("express").Router();
const bodyParser = require("body-parser");
const Player = require("../models/player.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//get player input form data
router.post('/create-player', async (req, res) => {

  //create player
  const player = new Player ({
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
    team: req.body.team
  });

  //save player to db
  try{
    const newPlayer = await player.save();
    res.send(newUser);
  } catch(error){
    res.status(400).send(error);
  }

  //return res.redirect('index.html');
});
 
module.exports = router;
