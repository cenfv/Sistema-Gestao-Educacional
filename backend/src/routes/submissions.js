const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

router.get(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    try {
      const submission = await submissionController.getAllSubmission();
      return res.status(200).json({
        submission,
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        msg: "Submission not found",
      });
    }
  }
);

router.get(
  "/:id",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    const targetId = req.params.id;
    try {
      const submission = await submissionController.getSubmissionById(targetId);
      if (submission) {
        return res.status(200).json({
          submission,
        });
      }
      return res.status(404).json({
        msg: "Submission not found",
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        msg: "Submission not found",
      });
    }
  }
);

router.post(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    const { student, subject, test, questions } = req.body;
    try {
      const submission = await submissionController.createSubmission(
        student,
        subject,
        test,
        questions
      );
      return res.status(201).json({
        submission,
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);
module.exports = router;
