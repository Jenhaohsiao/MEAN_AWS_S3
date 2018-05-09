var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/authorization', function (req, res) {

  res.render('authorization', {
    // accessResult: "test",
  });
});

module.exports = router;