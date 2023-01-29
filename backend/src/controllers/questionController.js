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
      { correctAlternative: correctID },
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
exports.getQuestionById = async (id) => {
  const question = await Question.findById(id)
 
  if (question) {
    return question;
  }
};

exports.updateQuestion = async (
  id,
  title,
  description,
  alternatives,
  correctAlternative
) => {
  try {
    const question = await Question.findById(id);
    const res = await question.updateOne({
      title,
      description,
      alternatives,
      correctAlternative,
    });
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.deleteQuestion = async (id) => {
  try {
    const question = await Question.findById(id);
    const res = await question.deleteOne();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
