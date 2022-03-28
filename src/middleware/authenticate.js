const req = require("express/lib/request");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  if (!req.headers.authorizetion) {
    return res.status(400).send("token not found");
  }
  if (!req.headers.authorizetion.startsWith("Bearer ")) {
    return res.status(400).send("token not found");
  }
};

const token = req.headers.authorizetion.trim().split(" ")[1];

let decoded;
try {
  decoded = await verifyToken(token);
} catch (error) {
  res.status(400).send("token not found");
}

req.user = decoded.user._id;
module.exports = authenticate;
