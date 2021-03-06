//******************/
// POST ROUTES
//******************/

const express = require('express');
const router = express.Router();
const Posts = require('../models/posts.js');

//**** GET ALL POSTS FROM DB ****\\
router.get('/', (req, res)=>{
    Posts.find({}, (err, foundPosts)=>{
        res.json(foundPosts);
    }).populate('user');
});

//**** DELETE POST ****\\
router.delete('/:id', (req, res)=>{
    Posts.findByIdAndRemove(req.params.id, (err, deletedPost)=>{
        res.json(deletedPost);
    });
});


//**** CREATE POST ****\\
router.post('/', (req, res)=>{
    Posts.create(req.body, (err, createdPosts)=>{
        res.json(createdPosts);
    });
});


//**** EDIT POST ****\\
router.put('/:id', (req, res)=>{
    Posts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPost)=>{
        res.json(updatedPost);
    });
});

module.exports = router;
