const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    resumeText: {
      type: String,
      required: true,
      trim: true,
    },
    cleanResumeText: {
      type: String,
      required: true,
      trim: true
    },
    resumeKeywords: [String],
    semanticKeywords: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
