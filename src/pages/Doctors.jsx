import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import "../stylesheets/Doctors.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await API.get("/doctors");
        setDoctors(response.data);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <Navbar />

      <div className="doctors-page">
        <div className="doctors-header">
          <h1>Find Dermatologists</h1>
          <p>
            Connect with trusted skin specialists and book appointments based on
            availability.
          </p>
        </div>

        {loading ? (
          <p>Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p>No doctors registered yet.</p>
        ) : (
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div className="doctor-card" key={doctor._id}>
                <div className="doctor-avatar">👨‍⚕️</div>

                <h2>Dr. {doctor.name}</h2>
                <p className="specialization">Dermatologist</p>

                <div className="doctor-info">
                 <p>
  <strong>Clinic:</strong> DermaCure Clinic
</p>
                  <p>
  <strong>Location:</strong> Online Consultation
</p>
                 <p>
  <strong>Rating:</strong> ⭐ 4.8
</p>
                  <p>
                    <strong>Status:</strong>{" "}
                  <span className="available">Available Today</span>
                  </p>
                </div>

                <Link
                  to={`/book-appointment/${doctor._id}`}
                  className="book-btn"
                >
                  Book Appointment
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Doctors;
