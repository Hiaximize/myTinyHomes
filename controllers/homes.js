const express = require('express');
const homes = express.Router();
const Homes = require('../models/homes.js');
// const User = require('../models/users.js')
const seed = require('../models/seed.js')

// Uses Seed Data to populate the site with homes
homes.get('/seed', (req, res) => {
	Homes.create(seed, (err, data) => {
		res.json(data)
	})
})

homes.get('/', (req, res) => {
  // res.send('index');
  Homes.find({}, (err, foundHomes) => {
    res.json(foundHomes);
  });
});

homes.delete('/:id', (req, res) => {
  Homes.findByIdAndRemove(req.params.id, (err, deletedHomes) => {
    res.json(deletedHomes);
  });
});

homes.put('/:id', (req, res) => {
  Homes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedHome) => {
    res.json(updatedHome);
  });
});

homes.post('/', (req, res) => {
  Homes.create(req.body, (err, createdHome) => {
    res.json(createdHome);
  });
});

module.exports = homes;
