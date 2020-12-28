const express = require("express");
const multer = require("multer");
const { initialize, uploadImage } = require("./data-service");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", async (req, res) => {
  res.send("hello world!");
});

app.get("/images", (req, res) => {
  res.send("Images here");
});

app.get("/image/:id", (req, res) => {});

app.post("/uploadImage", async (req, res) => {
  let response = await uploadImage();
  if (response) {
    res.status(200).send("OK");
  }
});

app.put("/image/:id", (req, res) => {});

app.delete("/image/:id", (req, res) => {});

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
