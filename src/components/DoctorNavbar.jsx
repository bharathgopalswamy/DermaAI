import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";

function DoctorNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        DermaCure <span>AI</span>
      </div>

      <div className="navbar-links">
        <Link to="/doctor/dashboard">Dashboard</Link>
        <Link to="/doctor/patients">Patients</Link>
        <Link to="/doctor/appointments">Appointments</Link>
        <Link to="/doctor/cases">Cases</Link>
        <Link to="/doctor/profile">Profile</Link>
      </div>

      <div className="navbar-right">
        <Link to="/login" className="navbar-btn">
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default DoctorNavbar;