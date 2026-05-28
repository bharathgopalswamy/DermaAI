const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: String,
    doctorName: String,
    specialization: String,
    clinic: String,
    patientName: String,
    email: String,
    reason: String,
    date: String,
    time: String,
    status: {
      type: String,
      default: "Pending Confirmation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);