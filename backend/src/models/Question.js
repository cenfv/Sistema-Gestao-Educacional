const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  imageUrl: {
    type: String,
  },
  alternatives: [
    {
      description: String,
    },
  ],
  correctAlternative: {
    type: mongoose.Schema.Types.ObjectId,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Question", questionSchema);
