//******************/
// USER ROUTES
//******************/

const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//**** CREATE USER ****\\
router.post('/', function(req, res){
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, function(err, createdUser){
        res.status(201).json({
            status:201,
            message: "user created"
        });
    });
});
//**** GET USER INFO AND POSTS ****\\
// Not yet implemented in app
router.get('/user/:id', (req, res) => {
  Users.findById(req.params.id, (err, foundUser) => {
    // console.log(foundUser);
    res.json(foundUser)
    }).populate('posts');
  });

module.exports = router;
