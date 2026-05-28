import { useEffect, useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import "../stylesheets/ScanSkin.css";

const MODEL_URL = "/model/model.json";
const METADATA_URL = "/model/metadata.json";

function ScanSkin() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tmImage.load(MODEL_URL, METADATA_URL);
        setModel(loadedModel);
      } catch (error) {
        console.log("MODEL LOAD ERROR:", error);
        alert("AI model failed to load. Check public/model files.");
      }
    };

    loadModel();
  }, []);

  const getSeverity = (confidence) => {
    if (confidence >= 85) return "Severe";
    if (confidence >= 60) return "Moderate";
    return "Mild";
  };

  const getAffectedPercentage = (confidence) => {
    if (confidence >= 85) return 70;
    if (confidence >= 60) return 45;
    return 25;
  };

  const getSuggestions = (condition) => {
    const lower = condition.toLowerCase();

    if (lower.includes("acne")) {
      return [
        "Wash the affected area gently twice a day.",
        "Avoid squeezing or picking pimples.",
        "Use non-comedogenic skincare products.",
        "Consult a dermatologist if acne becomes painful or severe.",
      ];
    }

    if (lower.includes("rash")) {
      return [
        "Avoid scratching the affected area.",
        "Keep the skin clean and dry.",
        "Avoid harsh soaps or irritating products.",
        "Consult a dermatologist if the rash spreads or becomes painful.",
      ];
    }

    if (lower.includes("eczema")) {
      return [
        "Use fragrance-free moisturizer regularly.",
        "Avoid hot showers and harsh soaps.",
        "Keep the affected area hydrated.",
        "Consult a dermatologist if itching or inflammation worsens.",
      ];
    }

    return [
      "Keep the affected area clean.",
      "Avoid touching or scratching the skin.",
      "Use gentle skincare products.",
      "Consult a dermatologist for confirmation.",
    ];
  };

  const getProducts = (condition) => {
    const lower = condition.toLowerCase();

    if (lower.includes("acne")) {
      return [
        "Gentle cleanser",
        "Oil-free moisturizer",
        "Salicylic acid face wash",
      ];
    }

    if (lower.includes("eczema")) {
      return [
        "Fragrance-free moisturizer",
        "Gentle cleanser",
        "Barrier repair cream",
      ];
    }

    if (lower.includes("rash")) {
      return [
        "Gentle cleanser",
        "Fragrance-free moisturizer",
        "Soothing skin lotion",
      ];
    }

    return ["Gentle cleanser", "Fragrance-free moisturizer"];
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      alert("Please select an image first");
      return;
    }

    if (!model) {
      alert("AI model is still loading. Please wait.");
      return;
    }

    try {
      setLoading(true);

      const predictions = await model.predict(imageRef.current);
      const topPrediction = predictions.sort(
        (a, b) => b.probability - a.probability
      )[0];

      const condition = topPrediction.className;
      const confidence = Math.round(topPrediction.probability * 100);
      const severity = getSeverity(confidence);
      const affectedPercentage = getAffectedPercentage(confidence);
      const suggestions = getSuggestions(condition);
      const products = getProducts(condition);
      const doctorRecommended = severity !== "Mild";

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("userId", currentUser?._id || "");
      formData.append("condition", condition);
      formData.append("confidence", confidence);
      formData.append("severity", severity);
      formData.append("affectedPercentage", affectedPercentage);
      formData.append("suggestions", JSON.stringify(suggestions));
      formData.append("products", JSON.stringify(products));
      formData.append("doctorRecommended", doctorRecommended);
      formData.append(
        "disclaimer",
        "This is educational AI screening only and not a medical diagnosis."
      );

      const response = await API.post("/scans/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("latestScan", JSON.stringify(response.data.scan));
      navigate("/scan-result");
    } catch (error) {
      console.log("SCAN ERROR:", error);
      alert(error.response?.data?.message || "Scan failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="scan-page">
        <div className="scan-container">
          <h1>Scan Your Skin</h1>

          <p>
            Upload or capture a clear image of the affected skin area for
            AI-powered screening.
          </p>

          <div className="upload-box">
            {selectedImage ? (
              <img
                ref={imageRef}
                src={selectedImage}
                alt="Selected skin"
                className="preview-img"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="upload-placeholder">
                <span>📷</span>
                <h3>No image selected</h3>
                <p>Choose a skin image to continue</p>
              </div>
            )}
          </div>

          <div className="scan-actions">
            <label className="upload-btn">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>

            <label className="camera-btn">
              Open Camera
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={!selectedImage || loading}
          >
            {loading ? "Analyzing..." : "Analyze Skin"}
          </button>

          <div className="scan-note">
            <strong>Note:</strong> DermaCure AI is not a medical diagnosis tool.
            Please consult a dermatologist for serious symptoms.
          </div>
        </div>
      </div>
    </>
  );
}

export default ScanSkin;