const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const dotenv = require("dotenv");

const {
  initializeAWS,
  uploadImages,
  getImages,
  getImage,
  deleteImage,
} = require("./data-service");
const { createUser, authenticateUser } = require("./data-service-auth");
const { initializeMongo } = require("./data-service-auth");
const { LeakAddTwoTone } = require("@material-ui/icons");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

dotenv.config({ path: __dirname + "/AWS_PROFILE.env" });

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = process.env.JWTSECRET;

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  if (jwt_payload) {
    next(null, { _id: jwt_payload._id, userName: jwt_payload.userName });
  } else {
    next(null, false);
  }
});

passport.use(strategy);
app.use(passport.initialize());
app.use(cors());

let bucketName;

/*
 * Beginning of routes
 */
app.get("/", async (req, res) => {
  res.send(
    `Welcome to the Imagify API! You're currently using bucket ${bucketName}`
  );
});

app.get(
  "/api/images",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    getImages()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
);

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
  authenticateUser(req.body)
    .then((response) => {
      let payload = {
        _id: response._id,
        username: response.username,
      };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);

      res.status(200).json({ message: response, token: token });
    })
    .catch((err) => {
      res.status(401).json({ message: err });
    });
});

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
