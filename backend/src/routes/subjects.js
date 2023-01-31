const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const validate = require("../controllers/helper/validate");

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
router.get(
  "/:id",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    const targetId = req.params.id;
    try {
      const subject = await subjectController.getSubjectById(targetId);
      if (subject) {
        return res.status(200).json({
          subject,
        });
      }
      return res.status(404).json({
        msg: "subject not found",
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        msg: "subject not found",
      });
    }
  }
);

router.post(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  validate.checkAdminPrivilege,
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

router.put(
  "/:id",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  validate.checkAdminPrivilege,
  async (req, res, next) => {
    try {
      const { name, students, tests } = req.body;
      const subject = await subjectController.updateSubject(
        req.params.id,
        name,
        students,
        tests
      );
      return res.status(200).json({
        subject,
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
  validate.checkAdminPrivilege,
  async (req, res, next) => {
    try {
      const subject = await subjectController.deleteSubject(req.params.id);
      return res.status(200).json({
        msg: "Subject deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

module.exports = router;
