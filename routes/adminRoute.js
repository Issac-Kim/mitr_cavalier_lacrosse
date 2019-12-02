const Team = require("../models/team.js");
const User = require('../models/user');

const router = require('express').Router();

router.get('/homepage', async (req, res) => {
    if(req.session.user){
        const user = await User.findOne({ _id: req.session.user });

        if(user.admin) {
            res.render("admin", {error: req.session.createUserError}); 
        } else {
            const teamMap = await Team.find({owner: user._id });
            res.render("coach", {teams: teamMap });
        }
    } else {
        res.redirect('/api/user/login');
    }
});

module.exports = router;