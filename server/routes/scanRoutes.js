const express = require("express");
const multer = require("multer");
const Scan = require("../models/Scan");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const backendUrl =
  process.env.BACKEND_URL || "http://localhost:5000";

const imageUrl = `${backendUrl}/uploads/${req.file.filename}`;
    const scan = await Scan.create({
      userId: req.body.userId,
      imageUrl,
      condition: req.body.condition,
      confidence: Number(req.body.confidence),
      severity: req.body.severity,
      affectedPercentage: Number(req.body.affectedPercentage),
      suggestions: JSON.parse(req.body.suggestions),
      products: JSON.parse(req.body.products),
      doctorRecommended: req.body.doctorRecommended === "true",
      disclaimer: req.body.disclaimer,
    });

    res.status(201).json({
      message: "Scan completed successfully",
      scan,
    });
  } catch (error) {
    console.log("SCAN ERROR:", error);

    res.status(500).json({
      message: error.message || "Image scan failed",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const scans = await Scan.find().sort({ createdAt: -1 });
    res.json(scans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch scans", error });
  }
});

module.exports = router;