var express = require("express");
var router = express.Router();

/* GET group */
router.get('/', function(req, res, next) {
   res.send('Groups');
});

module.exports = router;
