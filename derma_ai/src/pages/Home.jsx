import { Link } from "react-router-dom";
import "../stylesheets/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-card">
        <div className="home-badge">AI Skin Screening Platform</div>

        <h1 className="home-title">
          DermaCure <span>AI</span>
        </h1>

        <p className="home-subtitle">
          Take a skin photo, get AI-powered screening insights, understand
          possible severity, and connect with nearby dermatologists.
        </p>

        <div className="home-buttons">
          <Link to="/login" className="home-btn-primary">
            Login
          </Link>

          <Link to="/register" className="home-btn-secondary">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;