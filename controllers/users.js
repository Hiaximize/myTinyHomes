const express = require('express');
const users = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');


// users.get('/', (req, res) => {
//   //   res.render("index.html")
//   let currentUser = req.session.currentUser
//   res.json(currentUser);
// })


users.get('/', (req, resp) => {
    resp.json(req.session)
});


users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password,
  bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    res.status(201).json({
      status:201,
      message:"user created"
    });
  });
});

// we can use this route to update the users favorite homes array
users.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser) => {
      res.json(updatedUser);
	  console.log(updatedUser);
	})
})

module.exports = users;
