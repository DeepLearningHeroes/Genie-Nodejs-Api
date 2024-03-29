const express = require("express");
const User = require("../models/user.model");
const Job = require("../models/job.model");

const router = express.Router();

router.post("/addUser", async (req, res) => {
  const {
    name,
    resumeText,
    cleanResumeText,
    resumeKeywords,
    semanticKeywords,
  } = req.body;
  const user = await User.create({
    name,
    resumeText,
    cleanResumeText,
    resumeKeywords,
    semanticKeywords,
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

router.post("/jobs", async (req, res) => {
  const { resume_keywords } = req.body;
  const job_ids = await Job.distinct("job_id", {
    job_keywords: { $in: resume_keywords },
  });
  const results = await Job.find({ job_id: { $in: job_ids } });
  res.status(200).json({ Jobs: results });
});

router.get("/keywords", async (req, res) => {
  const uniqueValues = await Job.aggregate([
    { $unwind: "$job_keywords" }, // Unwind the job_keyword array
    { $group: { _id: "$job_keywords" } }, // Group by job_keyword and create distinct values
  ]);
  const keywords = uniqueValues.map((obj) => obj._id);
  res.status(200).json({ keywords: keywords });
});

router.delete("/users", async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ message: "All user data deleted successfully!" });
});

module.exports = router;
