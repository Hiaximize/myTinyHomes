const express = require('express');
const router = express.Router();
const Homes = require('../models/homes.js');
const User = require('../models/users.js')
const seed = require('../models/seed.js')

// Uses Seed Data to populate the site with homes
router.get('/seed', (req, res) => {
	Homes.create(seed, (err, data) => {
		res.redirect('/')
	})
})

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
