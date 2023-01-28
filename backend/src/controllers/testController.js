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
exports.getAllTest = async () => {
  const test = await Test.find().populate("questions");
  if (test) {
    return test;
  }
};
