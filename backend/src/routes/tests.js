const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
const validate = require("../controllers/helper/validate");
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

router.get(
  "/:id",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (req, res, next) => {
    const targetId = req.params.id;
    try {
      const test = await testController.getTestById(targetId);
      if (test) {
        return res.status(200).json({
          test,
        });
      }
      return res.status(404).json({
        msg: "Test not found",
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
  validate.checkAdminPrivilege,
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

router.put(
  "/:id",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  validate.checkAdminPrivilege,
  async (req, res, next) => {
    try {
      const { title, description, questions } = req.body;
      const id = req.params.id;
      const test = await testController.updateTest(
        req.params.id,
        title,
        description,
        questions
      );
      return res.status(200).json({
        test,
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
      const test = await testController.deleteTest(req.params.id);
      return res.status(200).json({
        msg: "Test deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

module.exports = router;
