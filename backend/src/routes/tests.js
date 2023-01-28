const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

router.get(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    try {
      const test = await testController.getAllTest();
      return res.status(200).json({
        test,
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        msg: "Test not found",
      });
    }
  }
);

router.post(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    const { title, description, questions } = req.body;
    try {
      const test = await testController.createTest(
        title,
        description,
        questions
      );
      return res.status(201).json({
        test,
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

module.exports = router;
