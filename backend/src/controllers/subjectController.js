const Subject = require("../models/Subject");
const Student = require("../models/Student");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

exports.createSubject = async (name, students, tests) => {
  try {
    const subject = new Subject({
      name,
      students,
      tests,
    });
    const res = await subject.save();

    students.forEach(async (student) => {
      const findStudent = await Student.findOne({ _id: student });

      const updateRes = await findStudent.updateOne({
        $push: { subjects: res._id },
      });
    });
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
exports.getAllSubject = async () => {
  const subject = await Subject.find().populate("tests");
  if (subject) {
    return subject;
  }
};
exports.getSubjectById = async (id) => {
  const subject = await Subject.findById(id).populate("tests");

  if (subject) {
    return subject;
  }
};

exports.updateSubject = async (id, name, students, tests) => {
  try {
    const subject = await Subject.findById(id);
    const studentsToRemove = subject.students.filter(
      (student) => !students.includes(student)
    );
    console.log(studentsToRemove);
    const res = await subject.updateOne({
      name,
      students,
      tests,
    });

    students.forEach(async (student) => {
      const findStudent = await Student.findOne({ _id: student });
      console.log(findStudent.name);
      const updateRes = await findStudent.updateOne({
        $push: { subjects: subject._id },
      });
      console.log(updateRes);
    });

    studentsToRemove.forEach(async (student) => {
      const findStudent = await Student.findOne({ _id: student });
      console.log(findStudent.name);
      const updateRes = await findStudent.updateOne({
        $pull: { subjects: subject._id },
      });
      console.log(updateRes);
    });
    return res;
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.deleteSubject = async (id) => {
  try {
    const subject = await Subject.findById(id);
    const res = await subject.deleteOne();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
