function Utilites() {
	this.generateString = function() {
		var stringLength = 5;
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var string = "";

		for (var i = 0; i < stringLength; i++) {
			string += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return string;
	}
}

module.exports = new Utilites();