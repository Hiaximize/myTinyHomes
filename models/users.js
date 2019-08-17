const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  profileImage: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User;
