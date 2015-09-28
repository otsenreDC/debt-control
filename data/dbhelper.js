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

// PERSON
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

db.getPerson = function(id) {
	db.each('SELECT * ' + 
			' FROM ' + personTable +
			' WHERE rowid = ' + id, 
			function(err, row) {
				console.log(row);
			});
}

db.updatePerson = function(id, name, debt) {
	db.run("UPDATE " + personTable + 
		   " SET name =  "+ "'" + name + "'," +
		   " debt = " + debt +
		   " WHERE rowid = " + id);
}

db.updatePersonDebt = function(id, debt) {
	
}

module.exports = db;