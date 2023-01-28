const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

router.get(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    try {
      const question = await questionController.getAllQuestion();
      return res.status(200).json({
        question,
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        msg: "Question not found",
      });
    }
  }
);

router.post(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    const { title, description, alternatives, correctAlternative } = req.body;
    try {
      const question = await questionController.createQuestion(
        title,
        description,
        alternatives,
        correctAlternative
      );
      return res.status(201).json({
        question,
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

router.put(
  "/:id",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    try {
      const { title, description, alternatives, correctAlternative } = req.body;
      const question = await questionController.updateQuestion(
        req.auth.id,
        title,
        description,
        alternatives,
        correctAlternative
      );
      return res.status(200).json({
        question,
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

router.delete(
  "/:id",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    try {
      const question = await questionController.deleteQuestion(req.params.id);
      return res.status(200).json({
        msg: "Question deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

module.exports = router;
