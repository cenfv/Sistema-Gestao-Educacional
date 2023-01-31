const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validate = require("../controllers/helper/validate");
var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

router.get("/", async (req, res, next) => {
  const targetId = req.params.id;
  try {
    const user = await userController.getAllUsers(targetId);
    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "User not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await userController.createUser(
      name,
      email,
      password
    );
    return res.status(201).json({
      user,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});
router.get(
  "/:id",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  validate.checkAdminPrivilege,
  async (req, res, next) => {
    const targetId = req.params.id;
    try {
      const user = await userController.getUserById(targetId);
      if (user) {
        return res.status(200).json({
          user,
        });
      }
      return res.status(404).json({
        msg: "User not found",
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        msg: "User not found",
      });
    }
  }
);

router.put(
  "/:id",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  validate.checkAdminPrivilege,
  async (req, res, next) => {
    const targetId = req.params.id;
    if (targetId != req.id) {
      return res.status(404).json({
        msg: "User not authenticated",
      });
    }
    try {
      const password = req.body.password;
      const { name } = req.body;
      const user = await userController.updateUser(
        req.id,
        name,

        password
      );
      return res.status(200).json({
        user,
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
    const targetId = req.params.id;
    if (targetId != req.id) {
      return res.status(404).json({
        msg: "User not authenticated",
      });
    }
    try {
      const user = await userController.deleteUser(req.params.id);
      return res.status(200).json({
        msg: "User deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

module.exports = router;
