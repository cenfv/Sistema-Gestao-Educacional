const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

router.get(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    try {
      const subject = await subjectController.getAllSubject();
      return res.status(200).json({
        subject,
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        msg: "Subject not found",
      });
    }
  }
);

router.post(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    const { name, students, tests } = req.body;
    try {
      const subject = await subjectController.createSubject(
        name,
        students,
        tests
      );
      return res.status(201).json({
        subject,
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

module.exports = router;
