const express = require('express');
const router = express.Router();
const Animal = require('../models/posts.js');


router.get('/', (req, res)=>{
    Animal.find({}, (err, foundAnimals)=>{
        res.json(foundAnimals);
    });
});

router.delete('/:id', (req, res)=>{
    Animal.findByIdAndRemove(req.params.id, (err, deletedAnimal)=>{
        res.json(deletedAnimal);
    });
});

router.post('/', (req, res)=>{
    Animal.create(req.body, (err, createdAnimal)=>{
        res.json(createdAnimal);
    });
});

router.put('/:id', (req, res)=>{
    Animal.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedAnimal)=>{
        res.json(updatedAnimal);
    });
});

module.exports = router;
