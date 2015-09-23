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

		db.each('SELECT rowid AS id, name FROM groupT', function(err, row) {
			console.log(row.id + ': ' + row.name);
		});


	});

}

db.clous = function() {
	db.close();
};

module.exports = db;