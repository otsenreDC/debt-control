var express = require('express');
var router = express.Router();
var db = require("../data/dbhelper");
var url = require("url");

router.get('/', function(req, res, next) {
	res.send('Person/GET');

});

router.post('/', function(req, res, next) {
	res.send('Person/POST');
});

router.delete('/', function(req, res, next) {
	res.send('Person/DELETE');
});

router.put('/', function(req, res, next) {
	res.send('Person/PUT');
});

module.exports = router;