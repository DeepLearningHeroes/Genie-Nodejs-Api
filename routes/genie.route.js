const express = require("express");
const User = require("../models/user.model");

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

router.post("/addJob", async (req, res) => {});

module.exports = router;
