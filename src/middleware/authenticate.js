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
  if (!req.headers.authorization)
    return res
      .status(400)
      .send({ message: " token not found" });

  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({ message: " token not found" });

  const token = req.headers.authorization.trim().split(" ")[1];

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: " token not found" });
  }

  req.user = decoded.user._id;

  return next();
};




module.exports = authenticate;