const express = require("express");
const {
  initializeAWS,
  uploadImages,
  getImages,
  getImage,
  deleteImage,
} = require("./data-service");

const { createUser } = require("./data-service-auth");
const { initializeMongo } = require("./data-service-auth");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
const multer = require("multer");
const upload = multer();
app.use(cors());

let bucketName;
app.get("/", async (req, res) => {
  res.send(
    `Welcome to the Imagify API! You're currently using bucket ${bucketName}`
  );
});

app.get("/api/images", async (req, res) => {
  getImages()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/api/image/:id", (req, res) => {
  getImage(req.params.id)
    .then((img) => {
      res.status(200).send(img);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.post(
  "/api/uploadImage",
  upload.array("imageFile", 50),
  (req, res, next) => {
    if (req.files) {
      uploadImages(req.files)
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  }
);

app.post("/api/signup", upload.none(), (req, res) => {
  createUser(req.body)
    .then((username) => {
      res.status(200).send(username);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/api/login", upload.none(), (req, res) => {
  console.log(req.body);
});

app.put("/api/image/:id", (req, res) => {});

app.delete("/api/image/:id", (req, res) => {
  deleteImage(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/api/images", (req, res) => {});

app.listen(HTTP_PORT, () => {
  console.log(`App listening on ${HTTP_PORT}`);
  initializeMongo()
    .then((msg) => {
      console.log(msg);
    })
    .catch((err) => {
      console.log(err);
    });
  initializeAWS()
    .then((res) => {
      console.log(`S3 instance created. You're currently using bucket ${res}`);
      bucketName = res;
    })
    .catch((err) => {
      console.log(err);
    });
});
