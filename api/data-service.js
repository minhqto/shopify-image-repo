const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const path = require("path");
const { Readable } = require("stream");

dotenv.config({ path: __dirname + "/AWS_PROFILE.env" });
AWS.config.update({ region: process.env.REGION });

let s3;
let bucketName;
let uploadParams;

const uploadToS3 = (s3params) => {
  return new Promise((resolve, reject) => {
    s3.upload(s3params, (err, data) => {
      if (err) {
        reject({
          uploaded: false,
          error: err,
        });
      }
      if (data) {
        resolve({
          uploaded: true,
          data: data,
        });
      }
    });
  });
};

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

module.exports.uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    let fileStream = new Readable({
      read() {
        this.push(image.buffer);
        this.push(null); //signals end of stream
      },
    });
    let lowercaseImageName = image.originalname.toLowerCase(); //set all characters to lowercase to accommodate for browsers automatically change the caps of params
    uploadParams = {
      Bucket: bucketName,
      Key: path.basename(lowercaseImageName),
      Body: fileStream,
    };

    uploadToS3(uploadParams)
      .then((result) => {
        if (!result.uploaded) {
          reject(result.error);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
  });
};

module.exports.getImages = () => {
  return new Promise((resolve, reject) => {
    s3.listObjects({ Bucket: bucketName }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let images = [];
        data.Contents.forEach((item) => {
          let image = {};
          image.url = s3.getSignedUrl("getObject", {
            Bucket: bucketName,
            Key: item.Key,
          });
          image.name = item.Key;
          images.push(image);
        });
        resolve(images);
      }
    });
  });
};

module.exports.getImage = (imgKey) => {
  return new Promise((resolve, reject) => {
    let awsParams = {
      Bucket: bucketName,
      Key: imgKey,
    };

    s3.getObject(awsParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let imageUrl = s3.getSignedUrl("getObject", awsParams);
        resolve(imageUrl);
      }
    });
  });
};

module.exports.deleteImage = (imgName) => {
  return new Promise((resolve, reject) => {
    let awsParams = {
      Bucket: bucketName,
      Key: imgName,
    };
    s3.deleteObject(awsParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
