var jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

const genToken = (user) => {
  var token = jwt.sign({ user }, process.env.KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("already register");
    }
    user = await User.create(req.body);
    const token = genToken(user);
    return res.status(400).send({ user: user, token: token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("email not match");
    }
    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.status(400).send("password not match");
    }
    const token = genToken(user);
    return res.status(400).send({ user: user, token: token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { register, login };
