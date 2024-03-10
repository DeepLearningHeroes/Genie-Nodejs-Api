const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    job_id: {
      type: Number,
    },
    job_portal: {
      type: String,
      required: true,
      trim: true,
    },
    job_link: {
      type: String,
      required: true,
      trim: true,
    },
    job_description: {
      type: String,
      trim: true,
    },
    job_keywords: [String],
    job_posted: {
      type: String,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
