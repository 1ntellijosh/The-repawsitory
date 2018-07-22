const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.post('/', function(req, res){
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, function(err, createdUser){
        res.status(201).json({
            status:201,
            message: "user created"
        });
    });
});

router.get('/user/:id', (req, res) => {
  Users.findById(req.params.id, (err, foundUser) => {
    // console.log(foundUser);
    res.json(foundUser)
    }).populate('posts');
  });
<<<<<<< HEAD

=======
>>>>>>> 2f71ea987170fcaf6da4f71efcfad58e0ab6b1ad

module.exports = router;
