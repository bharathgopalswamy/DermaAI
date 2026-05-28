import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { doctors } from "../data/doctors";
import "../stylesheets/Doctors.css";

function Doctors() {
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

        <div className="doctors-grid">
          {doctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <div className="doctor-avatar">👨‍⚕️</div>

              <h2>{doctor.name}</h2>
              <p className="specialization">{doctor.specialization}</p>

              <div className="doctor-info">
                <p><strong>Clinic:</strong> {doctor.clinic}</p>
                <p><strong>Location:</strong> {doctor.location}</p>
                <p><strong>Rating:</strong> ⭐ {doctor.rating}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="available">{doctor.availability}</span>
                </p>
              </div>

              <Link to={`/book-appointment/${doctor.id}`} className="book-btn">
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Doctors;