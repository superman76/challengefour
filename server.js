var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var faker = require('faker');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/challangeThree');

var Product = require('./models/product');

var productRouter = require('./routes/products');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));


app.set('view engine', 'ejs');

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  Product.find(function(err, products){
    if(err){
      next (err)
    } else {
      res.render('index', { products: products })
    }
  })
});


app.use('/api', productRouter);

console.log("-----CREATEING PRODUCTS ------")
var counter = 0;
for (var i = 0; i < 5; i++) {
    var product = new Product();
    product.name = faker.commerce.productName();
    product.inStock = faker.random.boolean();
    product.cost = faker.commerce.price();

    product.save(function(err, product){
      if(err){
        console.log(err)
      } else {
        console.log(product)
      }
    })
    counter++

};



app.listen(port, function(){
  console.log('app listening on ' + port);
});