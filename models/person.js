var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  bank_account: Number,
  birth_date: Date,
  country: String,
  img: String,
  username: String,

});



module.exports = mongoose.model('Person', PersonSchema);