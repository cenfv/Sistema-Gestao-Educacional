const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, digite um nome"],
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "Por favor, digite seu email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [
      true,
      "Por favor, entre com uma senha de no mínimo 6 caracteres",
    ],
    minlength: [6, "Mínimo de 6 caracteres"],
  },
  role: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("User", userSchema);