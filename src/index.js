const { use } = require("bcrypt/promises");
const express = require("express");
const app = express();
const  { register, login } = require("./controllers/auth.controller")
const todoController=require("./controllers/todo.controller")
app.use(express.json())



app.post("/register", register);
app.post("/login", login);
app.use("/todos", todoController);
module.exports = app;
