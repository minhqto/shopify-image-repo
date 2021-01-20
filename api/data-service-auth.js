const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { userSchema } = require("./models/User");

const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
let User;
module.exports.initializeMongo = () => {
  return new Promise((resolve, reject) => {
    let db = mongoose.createConnection(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db.on("err", (err) => {
      reject(err);
    });

    db.once("open", () => {
      User = db.model("imagify-users", userSchema);
      resolve("Connected to mongo!");
    });
  });
};

module.exports.createUser = (userData) => {
  return new Promise((resolve, reject) => [
    bcrypt.genSalt(10, (saltErr, salt) => {
      bcrypt.hash(userData.password, salt, (hashErr, hash) => {
        if (hashErr) {
          reject(`Problem with password encryption: ${hashErr}`);
        } else {
          let newUser = new User({
            username: userData.username,
            password: hash,
            email: userData.email,
          });
          newUser.save((err, doc) => {
            if (err) {
              if (err.code === 11000) {
                reject("Username is already taken!");
              } else {
                reject(`Error creating account! ${err}`);
              }
            } else {
              resolve(doc.username);
            }
          });
        }
      });
    }),
  ]);
};

module.exports.authenticateUser = (userData) => {
  return new Promise((resolve, reject) => {
    User.find({ username: userData.username })
      .limit(1)
      .exec()
      .then((userReturned) => {
        if (userReturned.length === 0) {
          reject(`Unable to find user ${userData.username}`);
        }
        bcrypt
          .compare(userData.password, userReturned[0].password)
          .then((res) => {
            if (res) {
              resolve(userReturned[0]);
            } else {
              reject("Incorrect password for user " + userData.username);
            }
          });
      })
      .catch((err) => {
        reject(`Unable to find user ${userData.username}`);
      });
  });
};

module.exports.addImagesToAccount = (userData) => {};
module.exports.removeImagesFromAccount = (userData) => {};
