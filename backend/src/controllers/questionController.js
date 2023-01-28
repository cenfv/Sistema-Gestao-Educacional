const Question = require("../models/Question");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};
exports.createQuestion = async (
  title,
  description,
  alternatives,
  correctAlternative
) => {
  try {
    const question = new Question({
      title,
      description,
      alternatives,
    });
    let res = await question.save();
    const correctID = res.alternatives.at(correctAlternative)._id;
    res = await Question.findByIdAndUpdate(
      res._id,
      { correctAlternative: correct },
      { new: true }
    );

    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
exports.getAllQuestion = async () => {
  const question = await Question.find();
  if (question) {
    return question;
  }
};
