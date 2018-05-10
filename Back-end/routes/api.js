var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var bodyParser = require('body-parser');
var s3 = new AWS.S3();

router.use(bodyParser.json());

var canadaRegion = "ca-central-1";

var s3 = new AWS.S3({
  accessKeyId: process.env.awsKey,
  secretAccessKey: process.env.awsToken,
  region: canadaRegion
});


router.post('/api', function (req, res) {

  var apiKey = req.body.apiKey;
  var apiToken = req.body.apiToken;

  console.log(`APIKey in back-end ${apiKey}`);
  console.log(`APIToken in back-end ${apiToken}`);

  if (apiKey === process.env.awsKey && apiToken === process.env.awsToken) {
    res.status(200).send('From Back-end, access successful !!!');

    authorizeAWS();
  } else {
    res.status(404).send('From Back-end, access fail~~');
  }
  res.end();
});




router.post('/api/listBuckets', function (req, res) {
  
  const params = {};
  s3.listBuckets(params, function (err, data) {
    if (err) console.log(`Errors!:${err, err.stack}`); // an error occurred
    else
     res.send(data.Buckets);
  });
  // res.end();
});


function listBuckets() {
  const params = {};
  s3.listBuckets(params, function (err, data) {
    if (err) console.log(`Errors!:${err, err.stack}`); // an error occurred
    else
      console.log('Accessed S3 successfully. Buckets list:');

    for (i = 0; i < data.Buckets.length; i++) {
      console.log(data.Buckets[i].Name);
    }
  });
}

function authorizeAWS() {
  const params = {};
  s3.listBuckets(params, function (err, data) {
    if (err) console.log(`Errors!:${err, err.stack}`);
    else

    if (data.Buckets.length >= 1) {
      console.log('Accessed to AWS successfully');
    }

  });
}

module.exports = router;