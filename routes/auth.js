const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/create-user', async (req, res) => {
    //hash the password
    const seed = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, seed);

    //create user
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        team: req.body.privilege
    });

    //save user to db
    try{
        const newUser = await user.save();
        res.send(newUser);
    } catch(error){
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if(!user){ return res.send('User does not exist.') }

    const pass = await bcrypt.compare(req.body.password, user.password);
    if(!pass){ return res.send('Invalid password.'); }
    
    const token = jwt.sign({ _id: user._id, team: user.team }, process.env.TOKEN);
    res.header('auth-token', token).send(token);
});

module.exports = router;