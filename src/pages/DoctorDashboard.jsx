import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import "../stylesheets/DoctorDashboard.css";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const firstName = currentUser?.name?.split(" ")[0] || "Doctor";

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get("/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.log("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const todayAppointments = appointments.slice(0, 3);

  return (
    <>
      <Navbar />

      <div className="doctor-dashboard-page">
        <div className="doctor-hero">
          <div>
            <h1>Welcome, Dr. {firstName} 👨‍⚕️</h1>
            <p>
              Manage patient appointments, review skin scan requests, and track
              consultation activity.
            </p>
          </div>

          <button className="doctor-profile-btn">Update Profile</button>
        </div>

        <div className="doctor-stats-grid">
          <div className="doctor-stat-card">
            <h2>{appointments.length}</h2>
            <p>Total Appointments</p>
          </div>

          <div className="doctor-stat-card">
            <h2>{todayAppointments.length}</h2>
            <p>Today&apos;s Consultations</p>
          </div>

          <div className="doctor-stat-card">
            <h2>8</h2>
            <p>Pending Reviews</p>
          </div>

          <div className="doctor-stat-card">
            <h2>4.8</h2>
            <p>Patient Rating</p>
          </div>
        </div>

        <div className="doctor-content-grid">
          <div className="doctor-panel">
            <h2>Recent Patient Appointments</h2>

            {todayAppointments.length === 0 ? (
              <p className="empty-text">No appointments available.</p>
            ) : (
              todayAppointments.map((appointment) => (
                <div className="doctor-appointment-card" key={appointment._id}>
                  <div>
                    <h3>{appointment.patientName}</h3>
                    <p>{appointment.reason}</p>
                    <span>
                      {appointment.date} • {appointment.time}
                    </span>
                  </div>

                  <button className="view-btn">View</button>
                </div>
              ))
            )}
          </div>

          <div className="doctor-panel">
            <h2>Doctor Profile</h2>

            <div className="doctor-profile-box">
              <div className="doctor-avatar-large">👨‍⚕️</div>

              <h3>{currentUser?.name || "Doctor"}</h3>
              <p>Dermatologist</p>
              <span>Available for consultations</span>
            </div>
          </div>
        </div>

        <div className="doctor-panel full-width">
          <h2>Clinical Reminder</h2>
          <p>
            Patient scan results should be reviewed carefully. AI-generated
            predictions are only screening support and should not replace
            professional medical diagnosis.
          </p>
        </div>
      </div>
    </>
  );
}

export default DoctorDashboard;