import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../stylesheets/ScanResult.css";

function ScanResult() {
  const scan = JSON.parse(localStorage.getItem("latestScan"));

  if (!scan) {
    return (
      <>
        <Navbar />
        <div className="result-page">
          <div className="result-container">
            <div className="result-header">
              <h1>No Scan Result Found</h1>
              <p>Please upload and analyze a skin image first.</p>
            </div>

            <Link to="/scan" className="primary-action">
              Go to Scan Page
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="result-page">
        <div className="result-container">
          <div className="result-header">
            <div>
              <h1>Skin Scan Result</h1>
              <p>AI-generated screening summary for your uploaded skin image.</p>
            </div>

            <span className="result-status">{scan.severity} Severity</span>
          </div>

          <div className="result-grid">
            <div className="image-card">
              <img src={scan.imageUrl} alt="Skin scan" className="result-image" />
              <p>Uploaded skin image preview</p>
            </div>

            <div className="analysis-card">
              <h2>Detected Condition</h2>

              <div className="condition-name">{scan.condition}</div>

              <div className="confidence-box">
                <div>
                  <p>AI Confidence</p>
                  <h3>{scan.confidence}%</h3>
                </div>

                <div>
                  <p>Severity</p>
                  <h3>{scan.severity}</h3>
                </div>
              </div>

              <div className="severity-section">
                <div className="severity-top">
                  <span>Skin affected severity</span>
                  <span>{scan.affectedPercentage}%</span>
                </div>

                <div className="severity-bar">
                  <div
                    className="severity-fill"
                    style={{ width: `${scan.affectedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="recommendation-grid">
            <div className="recommend-card">
              <h2>AI Suggestions</h2>

              <ul>
                {scan.suggestions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="recommend-card">
              <h2>Possible Care Products</h2>

              <ul>
                {scan.products?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="warning-text">
                Use products only if suitable for your skin. Consult a doctor for
                sensitive skin or severe symptoms.
              </p>
            </div>
          </div>

          <div className="doctor-alert">
            <div>
              <h2>Doctor Recommendation</h2>
              <p>
                {scan.doctorRecommended
                  ? "A dermatologist consultation is recommended based on this screening result."
                  : "This result appears mild, but consult a dermatologist if symptoms worsen."}
              </p>
            </div>

            <Link to="/doctors" className="doctor-btn">
              Find Dermatologist
            </Link>
          </div>

          <div className="result-actions">
            <Link to="/scan" className="secondary-action">
              Scan Again
            </Link>

            <Link to="/dashboard" className="primary-action">
              Back to Dashboard
            </Link>
          </div>

          <div className="medical-disclaimer">
            <strong>Medical Disclaimer:</strong>{" "}
            {scan.disclaimer ||
              "This result is for educational screening only and is not a medical diagnosis."}
          </div>
        </div>
      </div>
    </>
  );
}

export default ScanResult;