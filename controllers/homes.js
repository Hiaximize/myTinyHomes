const express = require('express');
const router = express.Router();
const Homes = require('../models/homes.js');

router.get('/', (req, res) => {
  // res.send('index');
  Homes.find({}, (err, foundHomes) => {
    res.json(foundHomes);
  });
});

router.delete('/:id', (req, res) => {
  Homes.findByIdAndRemove(req.params.id, (err, deletedHomes) => {
    res.json(deletedHomes);
  });
});

router.put('/:id', (req, res) => {
  Homes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedHome) => {
    res.json(updatedHome);
  });
});

router.post('/', (req, res) => {
  Homes.create(req.body, (err, createdHome) => {
    res.json(createdHome);
  });
});

module.exports = router;
