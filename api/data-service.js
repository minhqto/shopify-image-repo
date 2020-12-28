const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const REGION = "us-east-2";
const fs = require("fs");
const path = require("path");

const file = __dirname + "/hello.txt";
const fileStream = fs.createReadStream(file);

fileStream.on("error", function (err) {
  console.log("File Error", err);
});
dotenv.config({ path: __dirname + "/AWS_PROFILE.env" });
AWS.config.update({ region: REGION });

let s3;
let bucketName;
let uploadParams;

module.exports.initialize = async function () {
  try {
    s3 = new AWS.S3({
      apiVersion: "2006-03-01",
    });

    s3.listBuckets(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        bucketName = data.Buckets[0].Name;
      }
    });

    return s3;
  } catch (err) {
    console.log(`Could not initialize ${err}`);
  }
};

module.exports.uploadImage = async () => {
  uploadParams = {
    Bucket: bucketName,
    Key: path.basename(file),
    Body: fileStream,
  };

  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      console.log(data.Location);
    }
  });
};
