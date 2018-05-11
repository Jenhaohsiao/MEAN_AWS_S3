var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var bodyParser = require('body-parser');
var s3 = new AWS.S3( { params: {Bucket: 'myBucket'} } );


router.use(bodyParser.json());

var canadaRegion = "ca-central-1";

var s3 = new AWS.S3({
    accessKeyId: process.env.awsKey,
    secretAccessKey: process.env.awsToken,
    region: canadaRegion
});


router.post('/upload/uploadObject', function (req, res) {

    console.log("upload/uploadObject");
    console.log("the req:", req.body);

    buf = new Buffer(req.body.file.replace(/^data:image\/\w+;base64,/, ""), 'base64')

    const params = {
        Body: buf,
        Bucket: req.body.bucketName, // bucket name
        Key: req.body.fileName, //file name
        
        ACL: 'public-read'
    };

    console.log("the params:", params);
    s3.putObject(params, function (err, data) {

        if (err) {
            console.log("Upload Object fail"); 
            console.log(err);
            res.status(500).send(err.stack);

        } else {
            console.log("Successfully uploaded object");
            res.status(200).send({
              message: 'Successfully uploaded object'
            });

        }

    });

});

module.exports = router;