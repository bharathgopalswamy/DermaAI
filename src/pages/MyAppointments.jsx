import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import "../stylesheets/MyAppointments.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await API.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await API.delete(`/appointments/${id}`);

      const updatedAppointments = appointments.filter(
        (appointment) => appointment._id !== id,
      );

      setAppointments(updatedAppointments);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel appointment");
    }
  };

  return (
    <>
      <Navbar />

      <div className="appointments-page">
        <div className="appointments-header">
          <h1>My Appointments</h1>
          <p>View and manage your booked dermatologist appointments.</p>
        </div>

        {loading ? (
          <div className="empty-appointments">
            <h2>Loading appointments...</h2>
          </div>
        ) : appointments.length === 0 ? (
          <div className="empty-appointments">
            <h2>No appointments booked yet</h2>
            <p>Your booked dermatologist appointments will appear here.</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {appointments.map((appointment) => (
              <div className="appointment-card" key={appointment._id}>
                <div className="appointment-top">
                  <div className="doctor-icon">👨‍⚕️</div>

                  <div>
                    <h2>{appointment.doctorName}</h2>
                    <p>{appointment.specialization}</p>
                  </div>
                </div>

                <div className="appointment-details">
                  <p>
                    <strong>Clinic:</strong> {appointment.clinic}
                  </p>

                  <p>
                    <strong>Patient:</strong> {appointment.patientName}
                  </p>

                  <p>
                    <strong>Email:</strong> {appointment.email}
                  </p>

                  <p>
                    <strong>Reason:</strong> {appointment.reason}
                  </p>

                  <p>
                    <strong>Date:</strong> {appointment.date}
                  </p>

                  <p>
                    <strong>Time:</strong> {appointment.time}
                  </p>
                </div>

                <div className="appointment-status">
                  <span>{appointment.status || "Pending Confirmation"}</span>
                </div>

                {appointment.doctorRecommendation && (
                  <div className="doctor-recommendation-box">
                    <h3>Doctor Recommendation</h3>
                    <p>{appointment.doctorRecommendation}</p>

                    {appointment.reviewedAt && (
                      <small>
                        Reviewed on{" "}
                        {new Date(appointment.reviewedAt).toLocaleDateString()}
                      </small>
                    )}
                  </div>
                )}

                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(appointment._id)}
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyAppointments;
