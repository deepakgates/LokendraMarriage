var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://localhost:27017/nodeAppDB', (err, database) => {
  if (err) return console.log(err)
	  db=database;
   
 
});

/* GET home page. */
router.get('/', function(req, res, next) {
 
 db.collection('quotes').find().toArray(function(err, results) {
  res.render('index', { quotes: results});
 });
	

 
});
router.post('/quotes', (req, res) => {
   console.log(req.body);
   db.collection('quotes').save(req.body, (err, result) => {
    if (err)  console.log(err);

    console.log('saved to database');
    res.redirect('/');
  })
})

module.exports = router;
