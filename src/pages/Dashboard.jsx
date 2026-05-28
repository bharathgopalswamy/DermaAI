import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../stylesheets/Dashboard.css";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const firstName = currentUser?.name?.split(" ")[0] || "User";

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-hero">
          <div>
            <h1>Welcome back, {firstName} 👋</h1>

            <p>
              Monitor your skin health, track AI screenings,
              and connect with dermatologists.
            </p>
          </div>

 
          <div className="hero-buttons">
            <Link to="/scan" className="hero-btn-primary">
              + New Scan
            </Link>

            <Link to="/doctors" className="hero-btn-secondary">
              + Book Appointment
            </Link>
          </div>
        </div>

        
        <div className="stats-grid">

          <div className="stat-card">
            <h2>12</h2>
            <p>Total Scans</p>
          </div>

          <div className="stat-card">
            <h2>82%</h2>
            <p>Skin Health Score</p>
          </div>

          <div className="stat-card">
            <h2>4</h2>
            <p>Appointments</p>
          </div>

          <div className="stat-card">
            <h2>2</h2>
            <p>Doctor Consultations</p>
          </div>

        </div>

        
        <div className="activity-section">

          <div className="activity-card">
            <h3>Recent Scan</h3>

            <p>
              Acne / Pimple-like condition detected on forehead region.
            </p>

            <span>Mild Severity</span>
          </div>

          <div className="activity-card">
            <h3>Recent Appointment</h3>

            <p>
              Appointment booked with Dr. Sarah Johnson.
            </p>

            <span>Tomorrow • 11:30 AM</span>
          </div>

          <div className="activity-card">
            <h3>AI Suggestions</h3>

            <p>
              Maintain hydration and avoid touching affected areas frequently.
            </p>

            <span>Updated 2 hours ago</span>
          </div>

        </div>

        {/* DISCLAIMER */}
        <div className="dashboard-info">
          <h2>Health Reminder</h2>

          <p>
            DermaCure AI provides educational skin screening support only.
            It does not replace professional medical diagnosis.
            Please consult a dermatologist for serious symptoms.
          </p>
        </div>

      </div>
    </>
  );
}

export default Dashboard;