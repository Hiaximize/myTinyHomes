const express = require('express');
const users = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

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

module.exports = users;
