const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    choice: {
        type:Number, 
        required: true,
    },
    correctChoice: {
        type: Boolean,
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Submission", submissionSchema);