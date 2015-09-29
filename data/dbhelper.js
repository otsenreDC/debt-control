var utils = require('../models/utilities');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('debts.db');

var groupTable 		= 'groupT';
var groupName 		= 'name';
var groupId 		= 'groupId'

var personTable 	= 'person';
var personName		= 'name';
var personGroupId	= 'groupId';
var personDebt		= 'debt';

db.createDB = function() {
	db.run('CREATE TABLE IF NOT EXISTS ' + groupTable +
		   ' ( '+ groupName + ' TEXT, ' + 
		   	      groupId + ' TEXT UNIQUE NOT NULL)');

	db.run('CREATE TABLE IF NOT EXISTS ' +  personTable + 
		   ' ( ' + personName + ' TEXT, ' + 
		   	       personGroupId + ' TEXT NOT NULL, ' +
		   	       personDebt + ' NUMBER, ' +
		   	       ' FOREIGN KEY (' + personGroupId + ') REFERENCES ' + groupTable + '(' + groupId + '))');
}

db.dropDB = function() {
	db.run('DROP TABLE ' + groupTable);
	db.run('DROP TABLE ' + personTable);
}


// GROUPS
db.insertGroup = function(name) {
	db.run('INSERT INTO \'' + groupTable + '\' (name, groupId) ' +
		   'VALUES( \'' + name + '\' ,' + 
		   	       '\'' + utils.generateString() + '\')');
}

db.deleteGroup = function(id) {
	db.run('DELETE FROM ' + groupTable + ' WHERE rowid' + ' = ' + id);
}

db.getGroup = function(id) {
	db.each('SELECT * '  + 
		    ' FROM ' + groupTable + 
		    ' WHERE rowid = ' + id, 
			function(err, row) {
				console.log(row.rowid + ' >> ' + row.name );
			});
}

db.updateGroup = function(id, name) {
	db.run('UPDATE ' + groupTable + 
		   ' SET name = ' + '\'' + name + '\'' + 
		   ' WHERE rowid = ' + id);
}

db.insertPerson = function(name, groupId, debt) {
	db.run('INSERT INTO \'' + personTable + '\' ' +
		   '(name, groupId, debt) ' +
		   'VALUES( \'' + name + '\',' +
		   	       '\'' + groupId + '\',' +
		   	       debt +' )');
}

db.deletePerson = function(id) {
	db.run('DELETE FROM ' + personTable + ' WHERE rowid = ' + id); 
}

db.getPerson = function(id, callback) {
	db.all('SELECT * ' + 
			' FROM ' + personTable +
			' WHERE rowid = ' + id, 
			function(err, row) {
				callback(row);
			});
}

db.getPersonsWithGroupId = function(id, callback) {
	var persons = [];
	db.all('SELECT * ' + 
		    ' FROM ' + personTable + 
		    " WHERE groupId = '" + id + "'", 
		    function(err, rows) {
		    	callback(rows);
		    });
}
db.updatePerson = function(id, name, debt, groupId) {
	db.run("UPDATE " + personTable + 
		   " SET name =  "+ "'" + name + "'," +
		   " debt = " + debt + "," +
		   " groupId = '" + groupId + "'" +
		   " WHERE rowid = " + id);
}

db.updatePersonDebt = function(id, debt) {
	db.get("SELECT debt FROM person WHERE rowid = " + id, function(err, row) {
		debt = parseInt(debt);
		var oldDebt = parseInt(row.debt);
		var newDebt = debt + oldDebt;
		db.run("UPDATE " + personTable +
		   " SET debt = " + newDebt +
		   " WHERE rowid = " + id);
	});
}

module.exports = db;