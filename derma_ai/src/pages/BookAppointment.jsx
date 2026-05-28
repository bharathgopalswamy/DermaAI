import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { doctors } from "../data/doctors";
import API from "../api/axios";
import "../stylesheets/BookAppointment.css";

function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find((doc) => doc.id === doctorId);

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    reason: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleTimeSelect = (time) => {
    setFormData({
      ...formData,
      time,
    });

    setErrors({
      ...errors,
      time: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason for visit is required";
    }

    if (!formData.date) {
      newErrors.date = "Appointment date is required";
    }

    if (!formData.time) {
      newErrors.time = "Please select a time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      const appointmentData = {
        userId: currentUser?._id,
        doctorName: doctor.name,
        specialization: doctor.specialization,
        clinic: doctor.clinic,
        patientName: formData.patientName,
        email: formData.email,
        reason: formData.reason,
        date: formData.date,
        time: formData.time,
      };

      const response = await API.post("/appointments", appointmentData);

      alert(response.data.message || "Appointment booked successfully!");

      navigate("/appointments");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) {
    return (
      <>
        <Navbar />
        <div className="booking-page">
          <h1>Doctor not found</h1>
          <Link to="/doctors">Back to Doctors</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="booking-page">
        <div className="booking-container">
          <div className="booking-header">
            <h1>Book Appointment</h1>
            <p>Schedule a dermatologist consultation for your skin concern.</p>
          </div>

          <div className="booking-card">
            <div className="doctor-summary">
              <div className="doctor-icon">👨‍⚕️</div>

              <div>
                <h2>{doctor.name}</h2>
                <p>
                  {doctor.specialization} • {doctor.clinic}
                </p>
                <span>{doctor.location}</span>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <label>
                Patient Name
                <input
                  type="text"
                  name="patientName"
                  placeholder="Enter your full name"
                  value={formData.patientName}
                  onChange={handleChange}
                />
                {errors.patientName && (
                  <small className="error-text">{errors.patientName}</small>
                )}
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="error-text">{errors.email}</small>
                )}
              </label>

              <label>
                Reason for Visit
                <textarea
                  name="reason"
                  placeholder="Describe your skin concern"
                  value={formData.reason}
                  onChange={handleChange}
                ></textarea>
                {errors.reason && (
                  <small className="error-text">{errors.reason}</small>
                )}
              </label>

              <label>
                Select Date
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <small className="error-text">{errors.date}</small>
                )}
              </label>

              <div>
                <p className="slot-title">Select Time Slot</p>

                <div className="time-slots">
                  {timeSlots.map((time) => (
                    <button
                      type="button"
                      key={time}
                      className={
                        formData.time === time ? "slot active-slot" : "slot"
                      }
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {errors.time && (
                  <small className="error-text">{errors.time}</small>
                )}
              </div>

              <button type="submit" className="confirm-btn" disabled={loading}>
                {loading ? "Booking..." : "Confirm Appointment"}
              </button>
            </form>

            <Link to="/doctors" className="back-link">
              ← Back to Doctors
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookAppointment;