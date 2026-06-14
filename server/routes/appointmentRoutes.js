const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
  }
});
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.doctorId,
    }).sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctor appointments",
      error: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cancel failed", error });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update status",
      error: error.message,
    });
  }
});

router.put("/:id/review", async (req, res) => {
  try {
    const { doctorRecommendation, status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        doctorRecommendation,
        status: status || "Completed",
        reviewedAt: new Date(),
      },
      { new: true },
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({
      message: "Doctor review saved successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save doctor review",
      error: error.message,
    });
  }
});

module.exports = router;
