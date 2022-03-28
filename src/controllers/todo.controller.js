const express = require("express");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const User = require("../models/user.model");
const Todo = require("../models/todo.model");
router.post("/", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user;
    let todo = await Todo.create(req.body);
    return res.status(200).send(todo);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.get("/", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user;
    let todo = await Todo.find({ user_id: req.body.user_id }).lean().exec();
    return res.status(200).send(todo);
  } catch (error) {
    return res.status(401).send(error.message, "Please login");
  }
});
router.get("/:id", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user;
    let todo = await Todo.find(req.params.id).lean().exec();
    return res.status(200).send(todo);
  } catch (error) {
    return res.status(401).send(error.message, "Please login");
  }
});
router.post("/:id", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user;
    let todo = await Todo.create(req.params.id, req.body, { new: true })
      .lean()
      .exec();
    return res.status(200).send(todo);
  } catch (error) {
    return res.status(401).send(error.message, "Please login");
  }
});
router.delete("/:id", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user;
    let todo = await Todo.findByIdAndDelete(req.params.id);

    return res.status(200).send(todo);
  } catch (error) {
    return res.status(401).send(error.message, "Please login");
  }
});

module.exports = router;
