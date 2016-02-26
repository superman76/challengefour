var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  inStock: Boolean,
  cost: String
});



module.exports = mongoose.model('Product', ProductSchema);