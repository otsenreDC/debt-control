var express = require('express');
var router = express.Router();

var db = require('../data/data');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(typeof db);
  db.testDB();
  res.render('index', { title: 'Express' });
});

module.exports = router;
