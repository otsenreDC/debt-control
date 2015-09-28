var express = require('express');
var router = express.Router();
var utils = require('../models/Utilities');

var db = require('../data/data');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.testDB();
  // console.log(utils.generateString());
  res.render('index', { title: 'Express' });
});

module.exports = router;
