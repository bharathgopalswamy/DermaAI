import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../stylesheets/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setLoginError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      alert("Login successful!");

      if (user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setLoginError(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>

        <p className="login-subtitle">
          Login to continue using DermaCure AI
        </p>

        {loginError && <div className="login-error">{loginError}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error-text">{errors.email}</small>}

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <small className="error-text">{errors.password}</small>
          )}

          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;