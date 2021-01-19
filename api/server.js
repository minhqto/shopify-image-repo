const express = require("express");
const jwt = require("jsonwebtoken");
const jwtexpress = require("express-jwt");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ path: __dirname + "/.env.development" });
const {
  initializeAWS,
  uploadImages,
  getImages,
  getImage,
  deleteImage,
} = require("./data-service");

const { createUser, authenticateUser } = require("./data-service-auth");
const { initializeMongo } = require("./data-service-auth");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const jwtSecret = process.env.JWTSECRET;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use(
  jwtexpress({
    secret: jwtSecret,
    algorithms: ["HS256"],
    getToken: (req) => req.cookies.token,
  }).unless({ path: ["/api/login", "/api/signup"] })
);
let bucketName;
/*
 * Beginning of routes
 */
app.get("/", async (req, res) => {
  res.send(
    `Welcome to the Imagify API! You're currently using bucket ${bucketName}`
  );
});

app.get("/api/images", (req, res) => {
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
        .then((response) => response)
        .catch((err) => {
          res.status(500).json(err);
        })
        .finally(() => {
          getImages()
            .then((images) => {
              res.status(200).json(images);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
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
  authenticateUser(req.body)
    .then((response) => {
      let payload = {
        _id: response._id,
        username: response.username,
      };
      let token = jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      // Prod setting

      res.status(200).json({ account: response, token: token });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: err });
    });
});

app.delete(
  "/api/image/:id",

  (req, res) => {
    deleteImage(req.params.id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
);

app.delete("/api/logout", (req, res) => {
  if (req.cookies) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(500).json({ message: "error logging out" });
  }
});

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
