const router = require("express").Router();
const bodyParser = require("body-parser");
const Team = require("../models/team.js");



//get team form data select owner from account dropdown
router.post('/create-team', async (req, res) => {
  //remove blank data
  var _coaches = req.body.coaches.filter(function(a) { return a.trim() != ''; });
  var _tournamets = req.body.tournaments.filter(function(a) { return a.trim() != ''; });
  var _tryouts = req.body.tryouts.filter(function(a) { return a.trim() != ''; });

  const team = new Team ({
    year: req.body.year.trim(),
    gender: req.body.gender.trim(),
    owner: req.body.owner.trim(),
    about: req.body.about.trim(),
    coaches: _coaches,
    tournaments: _tournamets,
    tryouts: _tryouts,
    location: req.body.location.trim(),
    fees: req.body.fees.trim(),
    other: req.body.other.trim()
  });

  try{
    const newTeam = await team.save();
  } catch(error){
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
    other: team.other
  });
});

router.post('/update-team-by-id/:id', async (req, res) => {
  //Remove blank data
  req.body.coaches = req.body.coaches.filter(function(a) { return a.trim() != ''; });
  req.body.tournaments = req.body.tournaments.filter(function(a) { return a.trim() != ''; });
  req.body.tryouts = req.body.tryouts.filter(function(a) { return a.trim() != ''; });

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
 
module.exports = router;