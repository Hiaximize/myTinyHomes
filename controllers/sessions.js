const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      status:200,
      message:'logout complete'
    });
  });
});

sessions.get('/', (req, resp)=>{
    resp.status(200).json({
      status: 200,
      message: "Session GOT IT!"
    });
});


sessions.post('/', (req, res) => {
  User.findOne({username:req.body.username}, (error, foundUser) => {
    if (foundUser) {
		if(bcrypt.compareSync(req.body.password,foundUser.password)){
	      req.session.currentUser = foundUser;
	      res.status(201).json({
	        status:201,
	        message:'session created'
	      });
	  } else {
	      res.status(401).json({
	        status:401,
	        message:'login failed'
	      });
	    }
	} else {
		res.status(401).json({
		  status:401,
		  message:'login failed'
		});
	  }
  })
})

module.exports = sessions;
