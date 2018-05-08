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

router.get('/', function (req, res) {

  res.render('index.ejs', {
    programName: "AWS S3",
    accessServerResult: "Please fill out the form"
  });
});

router.post('/', function (req, res) {

  var apiKey = req.body.apiKey;
  var apiToken = req.body.apiToken;

  console.log(`APIKey in back-end ${apiKey}`);
  console.log(`APIToken in back-end ${apiToken}`);

  if (apiKey === process.env.awsKey && apiToken === process.env.awsToken) {
    res.send('Your key or token are incorrect');
    // res.render('index.ejs', {
    //   accessServerResult: "Your key or token are incorrect"
    // });

    listBuckets();
  }else{
    console.log("Your key or token is incorrect")
    // res.render('index.ejs', {
    //   accessServerResult: "Accessed S3 successfully"
    // });
  }
  
  res.end();
});

function checkKey(){
  
}
function listBuckets() {
  const params = {};
  s3.listBuckets(params, function (err, data) {
    if (err) console.log(`Errors!:${err, err.stack}`); // an error occurred
    else 
    console.log('Accessed S3 successfully. Buckets list:');
    
    for (i = 0; i < data.Buckets.length; i++) { 
      console.log(data.Buckets[i].Name);
  }
   // successful response


  });
}

module.exports = router;