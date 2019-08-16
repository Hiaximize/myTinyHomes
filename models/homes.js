const mongoose = require('mongoose');

const homesSchema = new mongoose.Schema({
  name: String,
  type: String,
  builder: String,
  description: String,
  price: String,
  image: String,
  mobile: Boolean,
  sqft: Number,
  beds: Number,
  baths: Number,
  lofts: Number,
});

const Homes = mongoose.model('Homes', homesSchema);

module.exports = Homes;
