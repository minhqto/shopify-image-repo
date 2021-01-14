const express = require("express");
const {
  initialize,
  uploadImages,
  getImages,
  getImage,
  deleteImage,
} = require("./data-service");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
const multer = require("multer");

const upload = multer();
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Welcome to the Imagify API!");
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

app.listen(HTTP_PORT, async () => {
  console.log(`App listening on ${HTTP_PORT}`);
  try {
    let res = await initialize();
    if (res) {
      console.log("S3 instance created");
    } else {
      console.log("S3 instance failed");
    }
  } catch (err) {
    console.log(err);
  }
});
