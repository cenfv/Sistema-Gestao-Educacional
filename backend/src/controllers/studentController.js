const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = {};
  if (err.name === "MongoServerError" && err.code === 11000) {
    errors["email"] = "Email already exists";
  } else {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

exports.createStudent = async (name, enrollmentNumber,subjects, email, password) => {
  try {
    let passwordHash = "";
    if (password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const student = new Student({
      name,
      enrollmentNumber,
      subjects,
      email,
      password: passwordHash,
    });
    const res = await student.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.getAllStudents = async () => {
  const student = await Student.find();
  if (student) {
    return student;
  }
};

exports.studentAuth = async (email, password) => {
  const student = await Student.findOne({ email: email });
  const checkPassword = await bcrypt.compare(password, student.password);
  if (checkPassword) {
    return student;
  }
};

exports.getStudentById = async (id) => {
  const student = await Student.findById(id, "-password").populate("subjects");
  if (student) {
    return student;
  }
};

exports.updateStudent = async (
  id,
  name,
  enrollmentNumber,
  subjects,
  email,
  password
) => {
  try {
    let passwordHash = "";
    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }
    const student = await Student.findById(id);
    if (!password) {
      const res = await student.updateOne({
        name,
        enrollmentNumber,
        subjects,
      });
      return res;
    } else {
      const res = await student.updateOne({
        name,
        enrollmentNumber,
        subjects,
        password: passwordHash,
      });
      return res;
    }
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.deleteStudent = async (id) => {
  try {
    const student = await Student.findById(id);
    const res = await student.deleteOne();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.login = async function (email, password) {
  try {
    const student = await Student.findOne({ email: email });
    if (!student) {
      return "Student not found";
    }
    const checkPassword = await bcrypt.compare(password, student.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          id: student._id,
          name: student.name,
          enrollmentNumber: student.enrollmentNumber,
          email: student.email,
        },
        process.env.SECRET,
        {
          expiresIn: 86400,
        }
      );
      return {
        user: student,
        token: token,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
