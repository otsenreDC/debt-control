var express = require("express");
var router = express.Router();
var db = require("../data/dbhelper");
var url = require("url");

router.get('/', function(req, res, next) {
	res.send('Groups/GET');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	if (id) {
		db.getGroup(parseInt(id))
	};

	console.log(query);
});

router.post('/', function(req, res, next) {
	res.send('Groups/POST');
	var name = req.body.name;
	if (name) {
	// db.insertGroup(name);
	} else {
	// add to response
	};
});

router.delete('/', function(req, res, next) {
	res.send('Groups/DELETE');
	var id = req.body.id;
	db.deleteGroup(id);
});

router.put('/', function(req, res, next) {
	res.send('Groups/PUT');
	var id = req.body.id;
	var name = req.body.name;
	if (id && name) {
		db.updateGroup(id, name);
	};
});

module.exports = router;
