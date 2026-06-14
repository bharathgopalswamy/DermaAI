import { useEffect, useState } from "react";
import DoctorNavbar from "../components/DoctorNavbar";
import API from "../api/axios";
import "../stylesheets/DoctorDashboard.css";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctorRecommendation, setDoctorRecommendation] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const firstName = currentUser?.name?.split(" ")[0] || "Doctor";

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await API.get(
        `/appointments/doctor/${currentUser._id}`
      );
      setAppointments(response.data);
    } catch (error) {
      console.log("Doctor dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await API.put(`/appointments/${id}/status`, {
        status,
      });

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === id ? response.data.appointment : item
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const openReviewModal = async (appointment) => {
    await updateStatus(appointment._id, "Under Review");
    setSelectedAppointment({ ...appointment, status: "Under Review" });
    setDoctorRecommendation(appointment.doctorRecommendation || "");
  };

  const saveReview = async () => {
    if (!doctorRecommendation.trim()) {
      alert("Please write a recommendation before completing.");
      return;
    }

    try {
      const response = await API.put(
        `/appointments/${selectedAppointment._id}/review`,
        {
          doctorRecommendation,
          status: "Completed",
        }
      );

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === selectedAppointment._id
            ? response.data.appointment
            : item
        )
      );

      setSelectedAppointment(null);
      setDoctorRecommendation("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save review");
    }
  };

  const pendingAppointments = appointments.filter(
    (item) =>
      item.status === "Pending Review" ||
      item.status === "Pending Confirmation"
  );

  const underReviewAppointments = appointments.filter(
    (item) => item.status === "Under Review"
  );

  const scanSharedAppointments = appointments.filter(
    (item) => item.allowDoctorToViewScan === true
  );

  const completedAppointments = appointments.filter(
    (item) => item.status === "Completed"
  );

  return (
    <>
     <DoctorNavbar />

      <div className="doctor-dashboard-page">
        <div className="doctor-hero">
          <div>
            <h1>Welcome Dr. {firstName}</h1>
            <p>
              Review assigned patient consultations,
              shared AI scans, symptoms, and treatment recommendations.
            </p>
          </div>

          <button className="doctor-profile-btn">Manage Availability</button>
        </div>

        <div className="doctor-stats-grid">
          <div className="doctor-stat-card">
            <h2>{appointments.length}</h2>
            <p>Total Requests</p>
          </div>

          <div className="doctor-stat-card">
            <h2>{pendingAppointments.length}</h2>
            <p>Pending Reviews</p>
          </div>

          <div className="doctor-stat-card">
            <h2>{underReviewAppointments.length}</h2>
            <p>Under Review</p>
          </div>

          <div className="doctor-stat-card">
            <h2>{completedAppointments.length}</h2>
            <p>Completed</p>
          </div>
        </div>

        <div className="doctor-panel">
          <h2>Patient Consultation Requests</h2>

          {loading ? (
            <p className="empty-text">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="empty-text">No patient appointment requests yet.</p>
          ) : (
            <div className="doctor-request-list">
              {appointments.map((appointment) => (
                <div className="doctor-request-card" key={appointment._id}>
                  <div className="request-main">
                    <div>
                      <h3>{appointment.patientName}</h3>
                      <p>{appointment.reason}</p>
                      <span>
                        {appointment.date} • {appointment.time}
                      </span>
                    </div>

                    <div
                      className={`request-status ${
                        appointment.status === "Completed"
                          ? "completed-status"
                          : appointment.status === "Under Review"
                          ? "review-status"
                          : ""
                      }`}
                    >
                      {appointment.status || "Pending Review"}
                    </div>
                  </div>

                  {appointment.allowDoctorToViewScan === true ? (
                    <div className="shared-scan-box">
                      <div className="scan-preview">
                        {appointment.sharedScanImage ? (
                          <img
                            src={appointment.sharedScanImage}
                            alt="Patient shared scan"
                          />
                        ) : (
                          <div className="no-image">No image available</div>
                        )}
                      </div>

                      <div className="scan-summary">
                        <h4>Shared AI Scan Result</h4>
                        <p>
                          <strong>Condition:</strong>{" "}
                          {appointment.sharedCondition || "Not available"}
                        </p>
                        <p>
                          <strong>Severity:</strong>{" "}
                          {appointment.sharedSeverity || "Not available"}
                        </p>
                        <p>
                          <strong>Confidence:</strong>{" "}
                          {appointment.sharedConfidence || 0}%
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="privacy-note">
                      Patient has not allowed scan image sharing for this
                      appointment.
                    </div>
                  )}

                  {appointment.doctorRecommendation && (
                    <div className="saved-recommendation">
                      <h4>Saved Recommendation</h4>
                      <p>{appointment.doctorRecommendation}</p>
                    </div>
                  )}

                  {appointment.status !== "Completed" ? (
                    <div className="doctor-actions">
                      <button
                        className="review-btn"
                        onClick={() => openReviewModal(appointment)}
                      >
                        Review Patient
                      </button>

                      <button
                        className="complete-btn"
                        onClick={() => openReviewModal(appointment)}
                      >
                        Complete With Notes
                      </button>
                    </div>
                  ) : (
                    <div className="completed-message">
                      ✓ Consultation Completed
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="doctor-panel full-width">
          <h2>Clinical Safety Reminder</h2>
          <p>
            AI scan results are only educational screening support. Doctors
            should use professional clinical judgment before advising patients.
          </p>
        </div>

        {selectedAppointment && (
          <div className="review-modal-overlay">
            <div className="review-modal">
              <button
                className="modal-close-btn"
                onClick={() => setSelectedAppointment(null)}
              >
                ×
              </button>

              <h2>Patient Clinical Review</h2>

              <div className="modal-patient-info">
                <p>
                  <strong>Patient:</strong> {selectedAppointment.patientName}
                </p>
                <p>
                  <strong>Concern:</strong> {selectedAppointment.reason}
                </p>
                <p>
                  <strong>Appointment:</strong> {selectedAppointment.date} at{" "}
                  {selectedAppointment.time}
                </p>
              </div>

              {selectedAppointment.sharedScanImage ? (
                <img
                  className="review-large-image"
                  src={selectedAppointment.sharedScanImage}
                  alt="Patient scan"
                />
              ) : (
                <div className="no-image large-no-image">
                  No scan image shared by patient
                </div>
              )}

              <div className="review-details">
                <p>
                  <strong>AI Condition:</strong>{" "}
                  {selectedAppointment.sharedCondition || "Not available"}
                </p>
                <p>
                  <strong>Severity:</strong>{" "}
                  {selectedAppointment.sharedSeverity || "Not available"}
                </p>
                <p>
                  <strong>Confidence:</strong>{" "}
                  {selectedAppointment.sharedConfidence || 0}%
                </p>
              </div>

              <textarea
                className="doctor-notes-input"
                placeholder="Write diagnosis, observation, recommendation, skincare advice, or follow-up instructions..."
                value={doctorRecommendation}
                onChange={(e) => setDoctorRecommendation(e.target.value)}
              />

              <button className="complete-btn" onClick={saveReview}>
                Save Recommendation & Complete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DoctorDashboard;