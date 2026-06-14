import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import "../stylesheets/Dashboard.css";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const firstName = currentUser?.name?.split(" ")[0] || "User";

  const [scans, setScans] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [scanResponse, appointmentResponse] = await Promise.all([
        API.get("/scans"),
        API.get("/appointments"),
      ]);

      const userScans = scanResponse.data.filter(
        (scan) => scan.userId === currentUser?._id
      );

      const userAppointments = appointmentResponse.data.filter(
        (appointment) => appointment.userId === currentUser?._id
      );

      setScans(userScans);
      setAppointments(userAppointments);
    } catch (error) {
      console.log("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalScans = scans.length;

  const averageConfidence =
    scans.length > 0
      ? Math.round(
          scans.reduce(
            (sum, scan) => sum + Number(scan.confidence || 0),
            0
          ) / scans.length
        )
      : 0;

  const getHealthScore = () => {
    if (scans.length === 0) return 100;

    let score = 100;

    scans.forEach((scan) => {
      const severity = scan.severity?.toLowerCase();

      if (severity === "severe") score -= 20;
      else if (severity === "moderate") score -= 10;
      else if (severity === "mild") score -= 5;
    });

    return Math.max(0, Math.min(score, 100));
  };

  const skinHealthScore = getHealthScore();

  const latestScan = scans[0];
  const latestAppointment = appointments[0];

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-hero">
          <div>
            <h1>Welcome back, {firstName} 👋</h1>

            <p>
              Monitor your skin health, track AI screenings, and connect with
              dermatologists.
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

        {loading ? (
          <div className="dashboard-info">
            <h2>Loading dashboard...</h2>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h2>{totalScans}</h2>
                <p>Total Scans</p>
              </div>

              <div className="stat-card">
                <h2>{skinHealthScore}%</h2>
                <p>Skin Health Score</p>
              </div>

              <div className="stat-card">
                <h2>{averageConfidence}%</h2>
                <p>Average AI Confidence</p>
              </div>

              <div className="stat-card">
                <h2>{appointments.length}</h2>
                <p>Appointments</p>
              </div>
            </div>

            <div className="activity-section">
              <div className="activity-card">
                <h3>Recent Scan</h3>

                {latestScan ? (
                  <>
                    <p>
                      {latestScan.condition} detected with{" "}
                      {latestScan.confidence}% confidence.
                    </p>

                    <span>{latestScan.severity} Severity</span>
                  </>
                ) : (
                  <>
                    <p>No scan completed yet.</p>
                    <span>Start your first scan</span>
                  </>
                )}
              </div>

              <div className="activity-card">
                <h3>Recent Appointment</h3>

                {latestAppointment ? (
                  <>
                    <p>
                      Appointment booked with {latestAppointment.doctorName}.
                    </p>

                    <span>
                      {latestAppointment.date} • {latestAppointment.time}
                    </span>
                  </>
                ) : (
                  <>
                    <p>No appointment booked yet.</p>
                    <span>Find a dermatologist</span>
                  </>
                )}
              </div>

              <div className="activity-card">
                <h3>AI Suggestions</h3>

                {latestScan?.suggestions?.length > 0 ? (
                  <>
                    <p>{latestScan.suggestions[0]}</p>
                    <span>Based on latest scan</span>
                  </>
                ) : (
                  <>
                    <p>
                      Complete a skin scan to receive personalized AI
                      suggestions.
                    </p>
                    <span>No suggestions yet</span>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <div className="dashboard-info">
          <h2>Health Reminder</h2>

          <p>
            DermaCure AI provides educational skin screening support only. It
            does not replace professional medical diagnosis. Please consult a
            dermatologist for serious symptoms.
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;