var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/', function (req, res) {

  res.render('index.ejs', {
    programName: "AWS S3",
  });
});



module.exports = router;