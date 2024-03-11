const express = require("express");
const User = require("../models/user.model");
const Job = require("../models/job.model");

const router = express.Router();

router.post("/addUser", async (req, res) => {
  const { name, resumeText } = req.body;
  const user = await User.create({
    name,
    resumeText,
  });

  if (!user) {
    res.status(400).json({ error: "User could not be created" });
    return;
  }
  res.status(200).json({ "User ID": user._id });
});

router.post("/addJobs", async (req, res) => {
  const {
    job_id,
    job_title,
    job_portal,
    job_link,
    job_description,
    job_keywords,
    job_posted,
    job_company,
    job_location,
  } = req.body;
  const existingJob = await Job.findOne({
    job_id: job_id,
  });

  if (existingJob) {
    res.status(409).json({ message: "Job already exist" });
    return;
  }
  const job = await Job.create({
    job_id,
    job_title,
    job_portal,
    job_link,
    job_description,
    job_keywords,
    job_posted,
    job_company,
    job_location,
  });
  if (!job) {
    res
      .status(400)
      .json({ error: "error inserting the document in the collection" });
    return;
  }
  res.status(200).json({ "Job id": job._id });
});

module.exports = router;
