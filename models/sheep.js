var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SheepSchema = new Schema({
  name: String
});



module.exports = mongoose.model('Sheep', SheepSchema);