var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://localhost:27017/LokendraMarriage', (err, database) => {
  if (err) return console.log(err)
	  db=database;
   
 
});

/* GET home page. */
router.get('/', function(req, res, next) {
 
 db.collection('quotes').find().toArray(function(err, results) {
  res.render('index', { quotes: results});
 });
	

 
});
router.post('/rsvp', (req, res) => {
   //console.log(req.body);
    
   db.collection('rsvp').save(req.body, (err, result) => {
    if (err){
		 res.json({result: "failed",data:err});
		 console.log(err);
	}  else{
		 res.json({result: "success"});
	 
		
	}

 //   console.log('saved to database');
 //   res.redirect('/');
  })
   
 
})

module.exports = router;
