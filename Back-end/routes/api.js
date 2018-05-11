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

router.post('/api/addABucket', function (req, res) {

  var newBucketName = req.body.name;
  console.log('newBucketName:',newBucketName);

  s3.createBucket({
    Bucket: newBucketName
  }, function (err, data) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log(`data: ${data}`);
    }

  });
});

router.post('/api/listBucketObjects', function (req, res) {

  var bucketName = req.body.bucketName;
  console.log('bucketName:',bucketName);

  s3.listObjectVersions({
    Bucket: bucketName
  }, function (err, data) {
    if (err) {
      console.log(`Error: ${err}`);
      res.status(500).send(err);
    } else {
      console.log(`data:`+ JSON.stringify(data));
      console.log(`data:`+ JSON.stringify(data, null, "    "));
      res.send(data);
    }

  });
});


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