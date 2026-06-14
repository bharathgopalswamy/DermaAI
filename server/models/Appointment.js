const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: String,
    doctorId: String,
    doctorName: String,
    specialization: String,
    clinic: String,
    patientName: String,
    email: String,
    reason: String,
    date: String,
    time: String,

    allowDoctorToViewScan: {
      type: Boolean,
      default: false,
    },
    sharedScanImage: String,
    sharedCondition: String,
    sharedSeverity: String,
    sharedConfidence: Number,

    status: {
      type: String,
      default: "Pending Review",
    },

    doctorRecommendation: {
      type: String,
      default: "",
    },

    reviewedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
