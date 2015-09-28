var express = require('express');
var router = express.Router();
var db = require("../data/dbhelper");
var url = require("url");

var getPersonById = function getPersonById(id, callback) {
	db.getPerson(id, function(person) {
		console.log('row : ' + JSON.stringify(person));
		callback(person);
	});
}

var getPersonsByGroupId = function getPersonsByGroupId(id) {
	db.getPersonsWithGroupId(id);
}

router.get('/', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var type = query.type;
	var id = query.id;

	if (type) {
		if (type === 'byId') {
			if (typeof id === 'string') {
				getPersonById(id, function(person) {
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify(person));
				});
			} else {
				console.log("ID DATA TYPE ERROR");
				res.end();
			};
		} else if (type === 'byGroupId') {
			if (typeof id === 'string') {
				getPersonsByGroupId(id);
				res.end();
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

module.exports = router;