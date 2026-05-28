import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        DermaCure <span>AI</span>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/scan">Scan Skin</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/appointments">Appointments</Link>
      </div>

      <div className="navbar-right">
        <Link to="/login" className="navbar-btn">
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;