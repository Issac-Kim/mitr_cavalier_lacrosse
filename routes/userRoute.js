const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/create-user', async (req, res) => {
    //hash the password
    const seed = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, seed);

    //create user
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        admin: req.body.admin
    });

    //save user to db
    try{
        const newUser = await user.save();
        req.session.createUserError = null;
    } catch(error){
        req.session.createUserError = 'Username is already in use.';
        res.redirect('/admin/homepage');
    }
    res.redirect("/");
});

router.get('/login', (req, res) => {
    if(req.session.user){
        res.redirect("/admin/homepage");
    } else {
        res.render("login", { error: req.session.loginError });
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if(!user){ 
        req.session.loginError = 'Invalid Username';
        res.redirect('login');
    } else {
        const pass = await bcrypt.compare(req.body.password, user.password);
        if(!pass){ 
            req.session.loginError ='Invalid Password';
            res.redirect('login');
        } else {
            req.session.loginError = null;
            req.session.user = user._id;
            res.redirect("/admin/homepage");
        }
    }
});

router.get('/get-all-users', (req, res) => {
    User.find({}, function(err, users) {
        var userMap = {};
        
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
    });
});

module.exports = router;