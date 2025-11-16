const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // en un proyecto real iría hasheada
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
