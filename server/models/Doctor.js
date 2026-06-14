const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    email: String,
    specialization: {
      type: String,
      default: "Dermatologist",
    },
    clinic: {
      type: String,
      default: "DermaCure Clinic",
    },
    location: {
      type: String,
      default: "Online Consultation",
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    availability: {
      type: String,
      default: "Available Today",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);