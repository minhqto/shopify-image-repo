const express = require("express");
const { initialize, uploadImage, getImages } = require("./data-service");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
const multer = require("multer");

const upload = multer();
app.use(cors());

app.get("/", async (req, res) => {
  res.send("hello world!");
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

app.get("/api/image/:id", (req, res) => {});

app.post(
  "/api/uploadImage",
  upload.array("imageFile", 10),
  (req, res, next) => {
    if (req.files) {
      req.files.forEach((file) => {
        uploadImage(file)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }
);

app.put("/api/image/:id", (req, res) => {});

app.delete("/api/image/:id", (req, res) => {});

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
