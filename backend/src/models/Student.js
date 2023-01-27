const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  enrollmentNumber: {
    type: String,
    required: [true, "enrollmentNumber is required"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "dateOfBirth is required"],
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "email is required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [
      true,
      "password is required and must be at least 6 characters long",
    ],
    minlength: [6, "password must be at least 6 characters long"],
  },
});

module.exports = mongoose.model("Student", studentSchema);
