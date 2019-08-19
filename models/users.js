const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstName: {
	  type:String,
	  required:true
  },
  lastName: {
	  type:String,
	  required:true
  },
  username: {
	  type:String,
	  required:true
  },
  password: {
	  type:String,
	  required:true
  },
  email: {
	  type:String,
	  required:true
  },
  profileImage: String

  // let's add a favorites: {} here to store all the users favorite listings
})

const User = mongoose.model('User', userSchema);

module.exports = User;
