var express = require('express');

var Person = require('../models/person');

var router = express.Router();

router.use(function(req, res, next){
  console.log('something is happeneing!');
  next();
});

var faker = require('faker');
var data = {
  people: [
  ],
  sheep: [
    {name: "bob"},
    {name: "sue"},
    {name: "doug"},
    {name: "harold"},
    {name: "sammy"}
  ],
  greetings: ["hello", "hola", "ciao"]
};

var setUpPeople = function(){
  var count = 0;
    Person.find(function(err, people){
      if(err){
        return next(err);
      } else {
        count = people.length;
        console.log("COUNT: ", count)
      }
    })

    if(count < 50){
      for (var i = 0; i < 50; i++) {
          var person = new Person();
          person.bank_account = faker.finance.amount();
          person.birth_date = faker.date.past(),
          person.country = faker.address.country(),
          person.img = faker.image.avatar(),
          person.username = faker.internet.userName(),

          person.save(function(err, person){
            if(err){
              console.log(err)
            } else {
              console.log(person)
            }
          })
        data.people.push(person)
      };
    }
}

setUpPeople();


//THE JSON RESPONSE BELOW SHOULD ONLY SEND AN ARRAY FULL OF PEOPLE
//EACH PERSON OBJECT SHOULD ONLY HAVE THEIR USERNAME, IMG, COUNTRY, AND DATE OF BIRTH

router.route('/people')
  .get(function(req, res){
    Person.find(function(err, people){
      if(err){
        return next(err);
      } else {
        res.json(data)
      }
    })
  });


module.exports = router;