const Subject = require("../models/Subject");

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
  const subject = await Subject.findById(id);

  if (subject) {
    return subject;
  }
};

exports.updateSubject = async (id, name, students, tests) => {
  try {
    const subject = await Subject.findById(id);
    const res = await subject.updateOne({
      name,
      students,
      tests,
    });

    return res;
  } catch (err) {
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
