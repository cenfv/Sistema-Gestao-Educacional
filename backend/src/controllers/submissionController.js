const Submission = require("../models/Submission");
const Question = require("../models/Question");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

function gradeCalc(questions) {
  let grade = 0;
  const promises = [];

  questions.forEach((question) => {
    promises.push(Question.findById(question.id));
  });

  return Promise.all(promises).then((results) => {
    results.forEach((res, index) => {
      if (res) {
        if (
          JSON.stringify(questions[index].answer) ===
          JSON.stringify(res.correctAlternative)
        ) {
          grade += 1;
        }
      }
    });

    grade = (10 / questions.length) * grade;
    return grade;
  });
}
exports.createSubmission = async (student, subject, test, questions) => {
  try {
    const submission = await Submission.findOne({
      student,
      subject,
      test,
    }).exec();

    if (submission) {
      throw new Error("This user has already submitted this test");
    }
    const testGrade = await gradeCalc(questions);
    const newSubmission = new Submission({
      student,
      subject,
      test,
      questions,
      testGrade,
    });
    const res = await newSubmission.save();

    return res;
  } catch (err) {
    console.log(err);
    if (err.message === "This user has already submitted this test") {
      throw err.message;
    }
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.getSubmissionById = async (id) => {
  const submission = await Submission.findById(id);

  if (submission) {
    return submission;
  }
};

exports.getAllSubmission = async () => {
  const submission = await Submission.find();
  if (submission) {
    return submission;
  }
};

exports.getStudentSubmissionBySubjectAndTest = async (student, subject, test) => {
  const submission = await Submission.findOne({
    student,
    subject,
    test,
  }).exec();

  if (submission) {
    return submission;
  }
  return null;
}
