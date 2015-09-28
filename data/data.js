// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');

var db = require('./dbhelper');

db.testDB = function() {
	db.serialize(function() {

		db.createDB();

		// var stmt = db.prepare('INSERT INTO groupT (name) VALUES(?)');

		// for (var i = 0; i < 10; i++) {
		// 	stmt.run('Ipsum ' + i);
		// }

		// stmt.finalize();

		// stmt = db.prepare('INSERT INTO person (name) VALUES(?)');

		// for (var i = 0; i < 10; i++) {
		// 	stmt.run('Ipsum ' + i);
		// }

		// stmt.finalize();

		db.each('SELECT rowid AS id, name, groupId FROM groupT', function(err, row) {
			console.log(row);
		});
		db.each('SELECT rowid as id, name, groupId, debt FROM person', function(err, row) {
			// console.log(row.rowid + ': ' + row.name + ' >> ' + 
			// 	        row.groupId + ' >> ' + row.debt);
			console.log(row);
		});


	});

}

db.clous = function() {
	db.close();
};

module.exports = db;