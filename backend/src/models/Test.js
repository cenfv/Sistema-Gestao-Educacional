const TestSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  questions: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Test", testSchema);
