const router = require("express").Router();
const bodyParser = require("body-parser");
const Player = require("../models/player.js");



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));


//get player input form data
router.post('/create-player', async (req, res) => {

  //create player
  const player = new Player ({
    name: req.body.playerName,
    number: req.body.playerNumber,
    position: req.body.position,
    teamName: req.body.teamName
  });

  //save player to db
  try{
    const newPlayer = await player.save();
    res.send(newPlayer);
  } catch(error){
    res.status(400).send(error);
  }

  //return res.redirect('index.html');
});
 
module.exports = router;
