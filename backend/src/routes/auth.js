var express = require('express');
var router = express.Router();
const studentController = require("../controllers/studentController");
const userController = require("../controllers/userController");
var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password required!");
  }
  var userResponse = await userController.login(email, password);
  var studentResponse = await studentController.login(email, password);
  
  if (!userResponse && !studentResponse) {
    return res.status(401).send("Invalid credentials!");
  }

  if (userResponse) {
    return res.send(userResponse);
  }

  return res.send(studentResponse);
});

router.post(
  "/data",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async function (req, res, next) {
    return res.send(req.auth);
  }
);

module.exports = router;
