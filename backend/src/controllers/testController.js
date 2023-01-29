const Test = require("../models/Test");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};
exports.createTest = async (title, description, questions) => {
  try {
    const test = new Test({
      title,
      description,
      questions,
    });
    const res = await test.save();

    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.getTestById = async (id) => {
  const test = await Test.findById(id);

  if (test) {
    return test;
  }
};

exports.getAllTest = async () => {
  const test = await Test.find().populate("questions");
  if (test) {
    return test;
  }
};
exports.updateTest = async (id, title, description, questions) => {
  try {
    const test = await Test.findById(id);
    const res = await test.updateOne({
      title,
      description,
      questions,
    });
    
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.deleteTest = async (id) => {
  try {
    const test = await Test.findById(id);
    const res = await test.deleteOne();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
