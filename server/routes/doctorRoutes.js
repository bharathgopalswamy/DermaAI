const express = require("express");
const User = require("../models/User");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const doctors = await User.find(
      { role: "doctor" },
      "-password"
    );

    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id).select("-password");

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
});

module.exports = router;