var express = require('express');
var router = express.Router();
var db = require("../data/dbhelper");
var url = require("url");

router.get('/', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var type = query.type;
	var id = query.id;

	if (type) {
		if (type === 'byId') {
			if (typeof id === 'string') {
				db.getPerson(id, function(person) {
					res.json(person);
				});
			} else {
				res.write("ID DATA TYPE ERROR");
				res.end();
			};
		} else if (type === 'byGroupId') {
			if (typeof id === 'string') {
				db.getPersonsWithGroupId(id, function(person) {
					res.json(person);
				});
			} else {
				console.log("ID DATA TYPE ERROR");
				res.end();
			};
		}
	}
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
		res.end();
	}
});

router.delete('/', function(req, res, next) {
	res.send('Person/DELETE');
	var id = req.body.id;
	db.deletePerson(id);
});

router.put('/', function(req, res, next) {
	res.send('Person/PUT');
	var id = req.body.id;
	var name = req.body.name;
	var debt = req.body.debt;
	var groupId = req.body.groupId;
	console.log(name + debt + groupId);
	db.updatePerson(id, name, debt, groupId);
});

router.put('/debt', function(req, res, next) {
	var id = req.body.id;
	var debt = req.body.debt;
	db.updatePersonDebt(id, debt);
	res.send('Person/debt/PUT');
});

module.exports = router;