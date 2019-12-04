const router = require("express").Router();
const Team = require("../models/team.js");
const multer = require("multer");
const fs = require('fs');
const upload = multer({dest: './photos/'});



//get team form data select owner from account dropdown
router.post('/create-team', async (req, res) => {
  //remove blank data
  var _coaches = req.body.coaches.filter(function(a) { return a.trim() != ''; });
  var _tournaments = req.body.tournaments.filter(function(a) { return a.trim() != ''; });
  var _tryouts = req.body.tryouts.filter(function(a) { return a.trim() != ''; });

  //Add players
  var players = [];
  for (var i=0; i<req.body.number.length; i++) {
    var jsonObj = { 
      "Number": req.body.number[i].trim(), 
      "firstName": req.body.first[i].trim(), 
      "lastName": req.body.last[i].trim(),
      "position": req.body.position[i].trim()
    }
    if(jsonObj.Number != "" || jsonObj.firstName != "" || jsonObj.lastName != "" || jsonObj.position != "") {
      players.push(jsonObj);
    }
  }

  const team = new Team ({
    year: req.body.year.trim(),
    gender: req.body.gender.trim(),
    owner: req.body.owner.trim(),
    about: req.body.about.trim(),
    coaches: _coaches,
    tournaments: _tournaments,
    tryouts: _tryouts,
    location: req.body.location.trim(),
    fees: req.body.fees.trim(),
    other: req.body.other.trim(),
    roster: players,
    images: new Array()
  });

  try{
    const newTeam = await team.save();

  } catch(error){
    res.status(400).send(error);
  }

  res.redirect('/');
});



router.post('/delete-team/', async (req, res) =>{
  try {
    const team = await Team.findOne( { "_id" : req.body.id } );
    files = team.images;
    for (i in files) {
      await fs.unlink(files[i].path);
    }
    await Team.deleteOne( { "_id" : req.body.id });  
  } catch(error) {
    res.status(400).send(error);
  }

  res.redirect('/');
});

router.get('/get-teams', async (req, res) =>{
  Team.find({}, function(err, teams) {
    var teamMap = {};

    teams.forEach(function(team) {
      teamMap[team._id] = team;
    });

    res.send(teamMap);  
  });
});

router.get('/team-page/:id', async (req, res) => {
  const team = await Team.findOne({ _id: req.params.id });  
  res.render("team", {
    year: team.year, 
    gender: team.gender, 
    about: team.about, 
    coaches: team.coaches, 
    tournaments: team.tournaments,
    tryouts: team.tryouts,
    location: team.location,
    fees: team.fees,
    other: team.other,
    roster: team.roster,
    id: req.params.id
  });
});

router.post('/update-team-by-id/:id', async (req, res) => {
  //Remove blank data
  req.body.coaches = req.body.coaches.filter(function(a) { return a.trim() != ''; });
  req.body.tournaments = req.body.tournaments.filter(function(a) { return a.trim() != ''; });
  req.body.tryouts = req.body.tryouts.filter(function(a) { return a.trim() != ''; });

  var players = [];
  for (var i=0; i<req.body.number.length; i++) {
    var jsonObj = { 
      "Number": req.body.number[i].trim(), 
      "firstName": req.body.first[i].trim(), 
      "lastName": req.body.last[i].trim(),
      "position": req.body.position[i].trim()
    }
    if(jsonObj.Number != "" || jsonObj.firstName != "" || jsonObj.lastName != "" || jsonObj.position != "") {
      players.push(jsonObj);
    }
  }

  req.body.roster = players;

  try{
    const team = await Team.updateOne({ _id: req.params.id }, req.body);
  } catch(error) {
    res.status(400).send(error);
  }

  res.redirect('/');
});

router.get('/get-team-by-id/:id', async (req, res) => {
  const team = await Team.findOne({ _id: req.params.id });
  res.send(team);
});

router.post('/upload/:id', upload.array('photo', 20), async (req, res) => {
  if(req.files) {
    for (i = 0; i < req.files.length; i++) {
      await Team.findOneAndUpdate(
        {_id: req.params.id},
        {$push: {images: req.files[i]}}
      );
    }
    res.redirect('/');
  } else throw err;
});

router.get('/get-teams-images/:id', async (req, res) => {
  const team = await Team.findOne({ _id: req.params.id });
  res.send(team.images)
});
 
module.exports = router;