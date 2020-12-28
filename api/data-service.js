const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config({ path: __dirname + "/AWS_PROFILE.env" });
AWS.config.update({ region: process.env.REGION });

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

module.exports.uploadImage = async (image) => {
  const fileStream = fs.createReadStream(image);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });

  uploadParams = {
    Bucket: bucketName,
    Key: path.basename(image),
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

module.exports.getImages = () => {
  return new Promise((resolve, reject) => {
    s3.listObjects({ Bucket: bucketName }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let imageUrls = [];
        data.Contents.forEach((item) => {
          let url = s3.getSignedUrl("getObject", {
            Bucket: bucketName,
            Key: item.Key,
          });
          imageUrls.push(url);
        });
        resolve(imageUrls);
      }
    });
  });
};
