var express = require('express');
var router = express.Router();
var db = require("../data/dbhelper");
var url = require("url");

router.get('/', function(req, res, next) {
	res.write('Person/GET');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	if (id) {
		db.getPerson(parseInt(id));
	}
	res.end();
});

router.post('/', function(req, res, next) {
	res.write('Person/POST');
	var name = req.body.name;
	var debt = req.body.debt;
	var groupId = req.body.groupId;
	if (typeof groupId === 'undefined') {
		var json = JSON.stringify({
			error: 122,
			description : 'groupId is undefined'
		});
		res.statusCode = 809;
		res.end(json);
	} else {
		console.log(name + debt + groupId);
		db.insertPerson(name, groupId, debt);
	}
});

router.delete('/', function(req, res, next) {
	res.send('Person/DELETE');
	var id = req.body.id;
	db.deletePerson(id);
});

router.put('/', function(req, res, next) {
	res.send('Person/PUT');
});

module.exports = router;