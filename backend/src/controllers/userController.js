const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = {};
  if (err.name === "MongoServerError" && err.code === 11000) {
    errors["email"] = "o email fornecido já se encontra cadastrado";
  } else {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

exports.createUser = async (name, email, password) => {
  try {
    let passwordHash = "";
    if (password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const user = new User({
      name,
      email,
      password: passwordHash,
    });
    const res = await user.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.getAllUsers = async () => {
  const user = await User.find();
  if (user) {
    return user;
  }
};

exports.getUserById = async (id) => {
  const user = await User.findById(id, "-password");
  if (user) {
    return user;
  }
};

exports.updateUser = async (id, name, password) => {
  try {
    let passwordHash = "";
    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }
    const user = await User.findById(id);
    if (!password) {
      const res = await user.updateOne({
        name,
      });
      return res;
    } else {
      const res = await user.updateOne({
        name,
        password: passwordHash,
      });
      return res;
    }
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await User.findById(id);
    const res = await user.deleteOne();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.login = async function (email, password) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw "invalid credentials";
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          name: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.SECRET,
        {
          expiresIn: 86400,
        }
      );
      return {
        user: user,
        token: token,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
